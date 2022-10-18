const { UsersRepository } = require('./../repositories');
const db = require('./../models');
const bcrypt = require('bcryptjs');

const repo = new UsersRepository();

class UsersController {
    async find(req, res) {
        const { id } = req.params;

        if (typeof id === 'string' && id.length > 0) {
            const user = await repo.findOneById(id);
            if (!user) {
                res.json({ message: 'Not found' }, 404);
                return;
            }

            res.json(user);
            return;
        }

        const users = await repo.find();
        res.json(users);
    }

    async add(req, res) {
        const user = new db.usuario();
        user.nombre = req.body.nombre;
        user.tipoUsuario = 0;
        user.usuario = req.body.usuario;
        user.password = bcrypt.hashSync(req.body.password);
        await repo.add(user);

        const json = user.toJSON();
        delete json.password;
        res.json(json);
    }

    async update(req, res) {
        const { id } = req.params;

        const user = await repo.findUserById(id);
        if (!user) {
            res.json({ message: 'Not found' }, 404);
            return;
        }
        user.nombre = req.body.nombre;
        user.tipoUsuario = 0;
        user.usuario = req.body.usuario;
        if (typeof req.body.password === 'string' && req.body.password.length > 0)
            user.password = bcrypt.hashSync(req.body.password);

        await repo.update(user);

        const json = user.toJSON();
        delete json.password;
        res.json(json);
    }

    async delete(req, res) {
        const { id } = req.params;

        const user = await repo.findUserById(id);
        if (!user) {
            res.json({ message: 'Not found' }, 404);
            return;
        }

        await repo.delete(user);

        res.json({ deleted: true }, 200);
    }
}

module.exports = UsersController;