const { UsersController, AuthController, DocumentosController, ProductosController, ClientesController, ProveedoresController, ReportesController } = require('./controllers');

const registerRoutes = (app) => {
    const auth = new AuthController();
    const users = new UsersController();
    const productos = new ProductosController();
    const documentos = new DocumentosController();
    const clientes = new ClientesController();
    const proveedores = new ProveedoresController();
    const reportes = new ReportesController();

    const routes = [
        // auth
        {
            method: 'post',
            route: '/auth/login',
            callback: auth.login,
        },
        {
            method: 'get',
            route: '/auth/checkin',
            callback: auth.checkin,
        },
        // users
        {
            method: 'get',
            route: '/users/:id',
            callback: users.find,
        },
        {
            method: 'get',
            route: '/users',
            callback: users.find,
        },
        {
            method: 'post',
            route: '/users',
            callback: users.add,
        },
        {
            method: 'put',
            route: '/users/:id',
            callback: users.update,
        },
        {
            method: 'delete',
            route: '/users/:id',
            callback: users.delete,
        },
        // productos
        {
            method: 'get',
            route: '/productos/codigo/:codigo',
            callback: productos.findByCodigo,
        },
        {
            method: 'get',
            route: '/productos/:id',
            callback: productos.find,
        },
        {
            method: 'get',
            route: '/productos',
            callback: productos.find,
        },
        {
            method: 'post',
            route: '/productos',
            callback: productos.add,
        },
        {
            method: 'put',
            route: '/productos/:id',
            callback: productos.update,
        },
        {
            method: 'delete',
            route: '/productos/:id',
            callback: productos.delete,
        },
        // documentos
        {
            method: 'get',
            route: '/documentos/folio/:id',
            callback: documentos.getDocumentoFolio
        },
        {
            method: 'get',
            route: '/documentos/tipo-documento/:id',
            callback: documentos.findByTipoDocumento,
        },
        {
            method: 'get',
            route: '/documentos/:id',
            callback: documentos.find,
        },
        {
            method: 'get',
            route: '/documentos',
            callback: documentos.find,
        },
        {
            method: 'post',
            route: '/documentos',
            callback: documentos.add,
        },
        {
            method: 'delete',
            route: '/documentos/:id',
            callback: documentos.delete,
        },
        // clientes
        {
            method: 'get',
            route: '/clientes/:id',
            callback: clientes.find,
        },
        {
            method: 'get',
            route: '/clientes',
            callback: clientes.find,
        },
        {
            method: 'post',
            route: '/clientes',
            callback: clientes.add,
        },
        {
            method: 'put',
            route: '/clientes/:id',
            callback: clientes.update,
        },
        {
            method: 'delete',
            route: '/clientes/:id',
            callback: clientes.delete,
        },
        // proveedores
        {
            method: 'get',
            route: '/proveedores/:id',
            callback: proveedores.find,
        },
        {
            method: 'get',
            route: '/proveedores',
            callback: proveedores.find,
        },
        {
            method: 'post',
            route: '/proveedores',
            callback: proveedores.add,
        },
        {
            method: 'put',
            route: '/proveedores/:id',
            callback: proveedores.update,
        },
        {
            method: 'delete',
            route: '/proveedores/:id',
            callback: proveedores.delete,
        },
        // Reportes
        {
            method: 'get',
            route: '/reportes/dashboard',
            callback: reportes.dashboard,
        }
    ]

    for (const { method, route, callback } of routes) {
        app[method.toLowerCase()](route, (req, res) => {
            try {
                callback(req, res);
            } catch (e) { console.error(`[HTTP_EX] ${e.message}`) }
        });
    }

}

module.exports = { registerRoutes }