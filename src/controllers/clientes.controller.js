const { ClientesRepository } = require('./../repositories');
const db = require('./../models');
const bcrypt = require('bcryptjs');

const repo = new ClientesRepository();

class ClientesController {
    async find(req, res) {
        const { id } = req.params;

        if (typeof id === 'string' && id.length > 0) {
            const cliente = await repo.findOneById(id);
            if (!cliente) {
                res.json({ message: 'Not found' }, 404);
                return;
            }

            res.json(cliente);
            return;
        }

        const clientes = await repo.find();
        res.json(clientes);
    }

    async add(req, res) {
        const cliente = new db.cliente();
        cliente.nombre = req.body.nombre;
        cliente.rfc = req.body.rfc;
        cliente.telefono = req.body.telefono;
        cliente.calle = req.body.calle;
        cliente.numero = req.body.numero;
        cliente.colonia = req.body.colonia;
        cliente.codigoPostal = req.body.codigoPostal;
        await repo.add(cliente);

        const json = cliente.toJSON();
        res.json(json);
    }

    async update(req, res) {
        const { id } = req.params;

        const cliente = await repo.findUserById(id);
        if (!cliente) {
            res.json({ message: 'Not found' }, 404);
            return;
        }
        cliente.nombre = req.body.nombre;
        cliente.rfc = req.body.rfc;
        cliente.telefono = req.body.telefono;
        cliente.calle = req.body.calle;
        cliente.numero = req.body.numero;
        cliente.colonia = req.body.colonia;
        cliente.codigoPostal = req.body.codigoPostal;
       
        await repo.update(cliente);

        const json = cliente.toJSON();
        res.json(json);
    }

    async delete(req, res) {
        const { id } = req.params;

        const cliente = await repo.findUserById(id);
        if (!cliente) {
            res.json({ message: 'Not found' }, 404);
            return;
        }

        await repo.delete(cliente);

        res.json({ deleted: true }, 200);
    }
}

module.exports = ClientesController;