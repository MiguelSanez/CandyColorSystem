const { UsersRepository } = require('../repositories');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const repo = new UsersRepository();

class AuthController {
    async login(req, res) {
        const { usuario, password } = req.body;
        const user = await repo.findUserByUsername(usuario);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            res.json({ message: 'Unauthenticated' }, 403);
            return;
        }

        const token = jwt.sign({ user_id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

        return res.json({
            token
        }, 201);

    }

    async checkin(req, res) {
        if (!req.user) {
            res.json({ message: 'Unauthenticated' }, 403);
        }
        const user = await repo.findUserByUsername(req.user.usuario);
        if (user) {
            const u = user.toJSON();
            delete u.password;
            return res.json(u, 200);
        }
        return res.json({ message: 'Not found' }, 404);
    }
}

module.exports = AuthController;