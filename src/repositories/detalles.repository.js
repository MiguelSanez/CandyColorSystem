const db = require('./../models');

class DetallesRepository {

    async find() {
        const detalle = await db.detalle.findAll();
        return detalle;
    }

    async findOneById(id) {
        const detalle = await db.detalle.findOne({
            where: { id },
        });

        return detalle;
    }

    async add(detalle) {
        detalle.id = 0;
        return (await detalle.save());
    }

    async update(detalle) {
        if (detalle.id <= 0)
            throw new Error('Expecting user to have a valid id.');

        return (await detalle.save());
    }

    async delete(detalle) {
        return (await detalle.destroy());
    }


};

module.exports = DetallesRepository;