const { UsersController, AuthController, DocumentosController, ProductosController, ClientesController, ProveedoresController } = require('./controllers');

const registerRoutes = (app) => {
    const auth = new AuthController();
    const users = new UsersController();
    const productos = new ProductosController();
    const documentos = new DocumentosController();
    const clientes = new ClientesController();
    const proveedores = new ProveedoresController();

    app.post('/auth/login', auth.login);

    app.get('/users/:id', users.find);
    app.get('/users', users.find);
    app.post('/users', users.add);
    app.put('/users/:id', users.update);
    app.delete('/users/:id', users.delete);

    app.get('/productos/:id', productos.find);
    app.get('/productos', productos.find);
    app.post('/productos', productos.add);
    app.put('/productos/:id', productos.update);
    app.delete('/productos/:id', productos.delete);
    
    app.get('/documentos/:id', documentos.find);
    app.get('/documentos', documentos.find);
    app.post('/documentos', documentos.add);
    app.put('/documentos/:id', documentos.update);
    app.delete('/documentos/:id', documentos.delete);

    app.get('/clientes/:id', clientes.find);
    app.get('/clientes', clientes.find);
    app.post('/clientes', clientes.add);
    app.put('/clientes/:id', clientes.update);
    app.delete('/clientes/:id', clientes.delete);

    app.get('/proveedores/:id', proveedores.find);
    app.get('/proveedores', proveedores.find);
    app.post('/proveedores', proveedores.add);
    app.put('/proveedores/:id', proveedores.update);
    app.delete('/proveedores/:id', proveedores.delete);

}

module.exports = { registerRoutes }