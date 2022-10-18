const db = require('./../models');

class ClientesRepository {

    async find() {
        const usuarios = await db.cliente.findAll();
        return usuarios;
    }

    async findOneById(id) {
        const cliente = await db.cliente.findOne({
            where: { id },
        });

        return cliente;
    }

    async add(cliente) {
        cliente.id = 0;
        return (await cliente.save());
    }

    async update(cliente) {
        if (cliente.id <= 0)
            throw new Error('Expecting user to have a valid id.');

        return (await cliente.save());
    }

    async delete(cliente) {
        return (await cliente.destroy());
    }


};

module.exports = ClientesRepository;