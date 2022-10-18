const db = require('./../models');

class UsersRepository {

    async find() {
        const usuarios = await db.usuario.findAll();
        return usuarios;
    }

    async findUserById(id) {
        const user = await db.usuario.findOne({
            where: { id },
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