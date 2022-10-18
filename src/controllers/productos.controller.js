const { ProductosRepository } = require('./../repositories');
const db = require('./../models');

const repo = new ProductosRepository();

class ProductosController {
    async find(req, res) {
        const { id } = req.params;

        if (typeof id === 'string' && id.length > 0) {
            const producto = await repo.findOneById(id);
            if (!producto) {
                res.json({ message: 'Not found' }, 404);
                return;
            }

            res.json(producto);
            return;
        }

        const productos = await repo.find();
        res.json(productos);
    }

    async add(req, res) {
        const producto = new db.producto();
        producto.esMateria = req.body.esMateria;
        producto.descripcion = req.body.descripcion;
        producto.codigo = req.body.codigo;
        producto.existencia = req.body.existencia;
        producto.costo = req.body.costo;
        producto.precio = req.body.precio;
        await repo.add(producto);

        const json = producto.toJSON();
        res.json(json);
    }

    async update(req, res) {
        const { id } = req.params;

        const producto = await repo.findOneById(id);
        if (!producto) {
            res.json({ message: 'Not found' }, 404);
            return;
        }
        producto.esMateria = req.body.esMateria;
        producto.descripcion = req.body.descripcion;
        producto.codigo = req.body.codigo;
        producto.existencia = req.body.existencia;
        producto.costo = req.body.costo;
        producto.precio = req.body.precio;

        await repo.update(producto);

        const json = producto.toJSON();
        res.json(json);
    }

    async delete(req, res) {
        const { id } = req.params;

        const producto = await repo.findOneById(id);
        if (!producto) {
            res.json({ message: 'Not found' }, 404);
            return;
        }

        await repo.delete(producto);

        res.json({ deleted: true }, 200);
    }
}