const db = require('./../models');

class UsersRepository {

    async find() {
        const usuarios = await db.usuario.findAll();
        return usuarios;
    }

    async findOneById(id) {
        const user = await db.usuario.findOne({
            where: { id },
        });

        return user;
    }

    async findUserByUsername(usuario) {
        const user = await db.usuario.findOne({
            where: { usuario },
            attributes: { include: ['password'] }
        });

        return user;
    }

    async add(user) {
        user.id = 0;
        return (await user.save());
    }

    async update(user) {
        if (user.id <= 0)
            throw new Error('Expecting user to have a valid id.');

        return (await user.save());
    }

    async delete(user) {
        return (await user.destroy());
    }


};

module.exports = UsersRepository;