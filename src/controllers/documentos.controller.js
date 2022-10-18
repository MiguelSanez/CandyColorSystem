const { DocumentosRepository } = require('./../repositories');
const db = require('./../models');

const repo = new DocumentosRepository();

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

    async add(req, res) {
        const documento = new db.documento();
        documento.idCliente = req.body.idCliente;
        documento.idUsuario = 0;
        documento.idProveedor = req.body.idProveedor;
        documento.tipoDocumento = 0;
        documento.documentoProveedor = req.body.documentoProveedor;
        documento.status = req.body.status;
        documento.subtotal = req.body.subtotal;
        documento.impuestos = req.body.impuestos;
        documento.total = req.body.total;
        documento.observaciones = req.body.observaciones;
        documento.serie = req.body.serie;
        documento.folio = req.body.folio;
        await repo.add(documento);

        const json = documento.toJSON();
        res.json(json);
    }

    async update(req, res) {
        const { id } = req.params;

        const documento = await repo.findOneById(id);
        if (!documento) {
            res.json({ message: 'Not found' }, 404);
            return;
        }
        documento.idCliente = 0;
        documento.idUsuario = 0;
        documento.idProveedor = 0;
        documento.tipoDocumento = 0;
        documento.documentoProveedor = req.body.documentoProveedor;
        documento.status = req.body.status;
        documento.subtotal = req.body.subtotal;
        documento.impuestos = req.body.impuestos;
        documento.total = req.body.total;
        documento.observaciones = req.body.observaciones;
        documento.serie = req.body.serie;
        documento.folio = req.body.folio;

        await repo.update(documento);

        const json = documento.toJSON();
        res.json(json);
    }

    async delete(req, res) {
        const { id } = req.params;

        const documento = await repo.findOneById(id);
        if (!documento) {
            res.json({ message: 'Not found' }, 404);
            return;
        }

        await repo.delete(documento);

        res.json({ deleted: true }, 200);
    }
}
module.exports = DocumentosController;