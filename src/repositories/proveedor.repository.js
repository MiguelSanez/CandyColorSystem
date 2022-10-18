const db = require('../models');

class ProveedoresRepository {

    async find() {
        const proveedor = await db.proveedor.findAll();
        return proveedor;
    }

    async findOneById(id) {
        const proveedor = await db.proveedor.findOne({
            where: { id },
        });

        return proveedor;
    }

    async add(proveedor) {
        proveedor.id = 0;
        return (await proveedor.save());
    }

    async update(proveedor) {
        if (proveedor.id <= 0)
            throw new Error('Expecting user to have a valid id.');

        return (await proveedor.save());
    }

    async delete(proveedor) {
        return (await proveedor.destroy());
    }


};

module.exports = ProveedoresRepository;