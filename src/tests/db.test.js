const db = require('../models');
const assert = require('assert').strict;

describe('db', function () {
    it('should connect successfully', async function () {
        assert.doesNotThrow(async () => { await db.authenticate() });
    });
});

describe('productos', function () {
    it('should not find producto', async function () {
        const producto = await db.producto.findOne({ where: { id: 'NANANA' } });
        assert.equal(producto, null);
    });
});

describe('clientes', function () {
    it('should not find cliente', async function () {
        const cliente = await db.cliente.findOne({ where: { id: 'NANANA' } });
        assert.equal(cliente, null);
    });
});

describe('proveedores', function () {
    it('should not find proveedor', async function () {
        const proveedor = await db.proveedor.findOne({ where: { id: 'NANANA' } });
        assert.equal(proveedor, null);
    });
});

describe('usuarios', function () {
    it('should not find usuario', async function () {
        const usuario = await db.usuario.findOne({ where: { id: 'NANANA' } });
        assert.equal(usuario, null);
    });
});

describe('documento', function () {
    it('should not find documento', async function () {
        const documento = await db.documento.findOne({ where: { id: 'NANANA' } });
        assert.equal(documento, null);
    });
});

describe('detalle', function () {
    it('should not find detalle', async function () {
        const detalle = await db.detalle.findOne({ where: { id: 'NANANA' } });
        assert.equal(detalle, null);
    });
});