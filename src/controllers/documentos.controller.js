const { DocumentosRepository, ProductosRepository, DetallesRepository } = require('./../repositories');
const db = require('./../models');
const { TIPO_DOCUMENTO } = require('./../models/documento');

const repo = new DocumentosRepository();
const detalle = new DetallesRepository();

const getDocumentoFolioA = async (idTipoDocumento) => {
    const id = parseInt(idTipoDocumento, 10);
    const tipoDocumento = Object.values(TIPO_DOCUMENTO).find(e => e.id === idTipoDocumento);

    if (!tipoDocumento) {
        return null;
    }

    const folio = await repo.findFolioByType(id);

    return {
        nombre: tipoDocumento.nombre,
        folio,
        serie: tipoDocumento.serie,
    }
}

class DocumentosController {
    async find(req, res) {
        const { id } = req.params;

        if (typeof id === 'string' && id.length > 0) {
            const documento = await repo.findOneById(id);
            if (!documento) {
                res.json({ message: 'Not found' }, 404);
                return;
            }

            res.json(documento);
            return;
        }

        const documentos = await repo.find();
        res.json(documentos);
    }

    async findByTipoDocumento(req, res) {
        const { id } = req.params;

        const documentos = await repo.findByTipoDocumento(id);
        res.json(documentos);
    }

    async getDocumentoFolio(req, res) {
        const id = parseInt(req.params.id, 10);
        const tipoDocumento = await getDocumentoFolioA(id);

        if (!tipoDocumento) {
            res.json({ message: 'Invalid document type. Expeciting 0, 1 or 2.' }, 401);
            return;
        }

        res.json(tipoDocumento, 200);
    }

    async add(req, res) {
        const { idCliente, idUsuario, idProveedor, tipoDocumento, observaciones, conceptos } = req.body;

        // 1) validar conceptos
        const repoProductos = new ProductosRepository();
        let subtotal = 0;
        for (const concepto of conceptos) {
            if (!concepto.cantidad || typeof concepto.cantidad !== "number" || concepto.cantidad <= 0) {
                return res.json({ message: 'Cantidad invalida.' }, 401);
            }
            const producto = await repoProductos.findOneById(concepto.id);
            if (!producto) {
                return res.json({ message: `No se encontró el producto por ID "${concepto.id}"` }, 401);
            }
            subtotal += concepto.cantidad * concepto.precio;
        }
        // 2) validar tipo documento
        const $tipoDocumento = await getDocumentoFolioA(tipoDocumento);

        const documento = new db.documento();
        documento.idCliente = idCliente;
        documento.idUsuario = idUsuario;
        documento.idProveedor = idProveedor;
        documento.tipoDocumento = tipoDocumento;
        documento.status = 1; // 1) creado
        documento.subtotal = subtotal;
        documento.impuestos = 0;
        documento.total = subtotal;
        documento.observaciones = observaciones;
        documento.serie = $tipoDocumento.serie;
        documento.folio = $tipoDocumento.folio;
        await repo.add(documento);

        const repoDetalle = new DetallesRepository();
        for (const concepto of conceptos) {
            const { id, descripcion, cantidad, precio } = concepto;
            const producto = await repoProductos.findOneById(id);
            const subtotal = cantidad * precio;
            const detalle = new db.detalle();
            detalle.idDocumento = documento.id;
            detalle.idProducto = id;
            detalle.descripcion = descripcion;
            detalle.cantidad = cantidad;
            detalle.subtotal = subtotal;
            detalle.impuestos = 0;
            detalle.total = subtotal;
            detalle.costo = producto.costo;
            detalle.precio = precio;

            // Venta (0) = restar existencia
            // Compra (1) = sumar existencia
            if (tipoDocumento === 0) {
                producto.existencia -= cantidad;
            } else if (tipoDocumento === 1) {
                producto.existencia += cantidad;
            }
            await repoDetalle.add(detalle);
            await producto.save();
        }

        const json = documento.toJSON();
        res.json(json, 201);
    }

    async delete(req, res) {
        const { id } = req.params;

        const documento = await repo.findOneById(id);
        if (!documento) {
            res.json({ message: 'Not found' }, 404);
            return;
        }

        documento.status = 0;
        documento.save();

        res.json({ deleted: true }, 200);
    }
}
module.exports = DocumentosController;