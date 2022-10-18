const { UsersController } = require('./controllers');

const registerRoutes = (app) => {
    const controller = new UsersController();

    app.get('/users/:id', controller.find);
    app.get('/users', controller.find);
    app.post('/users', controller.add);
    app.put('/users/:id', controller.update);
    app.delete('/users/:id', controller.delete);
}

module.exports = { registerRoutes }