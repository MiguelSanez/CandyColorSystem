const { UsersController, AuthController } = require('./controllers');

const registerRoutes = (app) => {
    const auth = new AuthController();
    const users = new UsersController();

    app.post('/auth/login', auth.login);

    app.get('/users/:id', users.find);
    app.get('/users', users.find);
    app.post('/users', users.add);
    app.put('/users/:id', users.update);
    app.delete('/users/:id', users.delete);
}

module.exports = { registerRoutes }