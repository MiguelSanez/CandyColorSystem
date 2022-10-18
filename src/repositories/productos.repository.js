const db = require('./../models');

class ProductosRepository {

    async find() {
        const productos = await db.producto.findAll();
        return productos;
    }

    async findProductById(id) {
        const producto = await db.producto.findOne({
            where: { id },
        });

        return producto;
    }

    async add(producto) {
        producto.id = 0;
        return (await producto.save());
    }

    async update(producto) {
        if (producto.id <= 0)
            throw new Error('Expecting product to have a valid id.');

        return (await producto.save());
    }

    async delete(producto) {
        return (await producto.destroy());
    }


};

module.exports = ProductosRepository;