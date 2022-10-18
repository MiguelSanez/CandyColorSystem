const AuthController = require('./auth.controller');
const UsersController = require('./users.controller');
const ClientesController = require('./clientes.controller');
const ProveedoresController = require('./proveedores.controller');
const ProductosController = require('./productos.controller');
const DocumentosController = require('./documentos.controller');

module.exports = {
    UsersController,
    ClientesController,
    ProveedoresController,
    ProductosController,
    DocumentosController,
    AuthController
};