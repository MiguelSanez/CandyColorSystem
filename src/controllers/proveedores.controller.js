const { ProveedoresRepository } = require('./../repositories');
const db = require('./../models');

const repo = new ProveedoresRepository();

class ProveedoresController {
    async find(req, res) {
        const { id } = req.params;

        if (typeof id === 'string' && id.length > 0) {
            const proveedores = await repo.findOneById(id);
            if (!proveedores) {
                res.json({ message: 'Not found' }, 404);
                return;
            }

            res.json(proveedores);
            return;
        }

        const proveedores = await repo.find();
        res.json(proveedores);
    }

    async add(req, res) {
        const proveedor = new db.proveedor();
        proveedor.nombre = req.body.nombre;
        proveedor.rfc = req.body.rfc;
        proveedor.referencia = req.body.referencia;
        proveedor.telefono = req.body.telefono;
        proveedor.calle = req.body.calle;
        proveedor.numero = req.body.numero;
        proveedor.colonia = req.body.colonia;
        proveedor.codigoPostal = req.body.codigoPostal;
        await repo.add(proveedor);

        const json = proveedor.toJSON();
        res.json(json);
    }

    async update(req, res) {
        const { id } = req.params;

        const proveedor = await repo.findUserById(id);
        if (!proveedor) {
            res.json({ message: 'Not found' }, 404);
            return;
        }
        proveedor.nombre = req.body.nombre;
        proveedor.rfc = req.body.rfc;
        proveedor.referencia = req.body.referencia;
        proveedor.telefono = req.body.telefono;
        proveedor.calle = req.body.calle;
        proveedor.numero = req.body.numero;
        proveedor.colonia = req.body.colonia;
        proveedor.codigoPostal = req.body.codigoPostal;
       
        await repo.update(proveedor);

        const json = proveedor.toJSON();
        res.json(json);
    }

    async delete(req, res) {
        const { id } = req.params;

        const proveedor = await repo.findUserById(id);
        if (!proveedor) {
            res.json({ message: 'Not found' }, 404);
            return;
        }

        await repo.delete(proveedor);

        res.json({ deleted: true }, 200);
    }
}

module.exports = ProveedoresController;