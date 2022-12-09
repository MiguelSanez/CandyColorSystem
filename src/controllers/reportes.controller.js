const { DocumentosRepository, DetallesRepository } = require('../repositories');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TIPO_DOCUMENTO } = require('../models/documento');
const SimpleCSV = require('./../simple.csv');

const repo = new DocumentosRepository();
const repoDetalle = new DetallesRepository();

class ReportesController {
    async dashboard(req, res) {

        const documentos = await repo.findByTipoDocumento(TIPO_DOCUMENTO.venta);
        const ventas = [0];
        const utilidades = [0];
        const labels = [];

        let venta = 0;
        let utilidad = 0;

        for (const documento of documentos) {
            // 1) Obtener todos los conceptos de cada ticket (documento)
            const conceptos = await repoDetalle.findByIdDocumento(documento.id);
            // 2) Calcular el total y utilidades, por producto.

            for (const concepto of conceptos) {
                venta += concepto.total;
                utilidad += concepto.total - (concepto.cantidad * concepto.costo);
            }

            ventas.push(venta);
            utilidades.push(utilidad);
            if (!labels.length) {
                labels.push(documento.createdAt);
            }
            labels.push(documento.createdAt);
        }

        return res.json({
            ventas,
            utilidades,
            labels,
        }, 200);

    }

    async generarReporte(req, res) {
        const { id } = req.params;
        let blob = null;
        let filename = `${id}_${new Date().getTime()}.csv`;
        if (id == 'sales') {
            // Reporte de ventas (0)
            const header = ['Documento', 'Fecha', 'Observaciones', 'Cliente', 'Cantidad', 'Producto', 'Subtotal', 'Total'];
            const csv = new SimpleCSV({ header });
            const documentos = await repo.findByTipoDocumento(0);
            for (const documento of documentos) {
                for (const detalle of documento.detalle) {
                    csv.push([
                        documento.documento,
                        documento.createdAt,
                        documento.observaciones,
                        documento.cliente.text,
                        detalle.cantidad,
                        detalle.descripcion,
                        detalle.subtotal,
                        detalle.total
                    ]);
                }
            }
            blob = Buffer.from(csv.generate()).toString('base64')
        } else if (id == 'suppliers') {
            // Reporte de compras por proveedor (1)
            const header = ['Documento', 'Fecha', 'Observaciones', 'Proveedor', 'Cantidad', 'Producto', 'Subtotal', 'Total'];
            const csv = new SimpleCSV({ header });
            const documentos = await repo.findByTipoDocumento(1);
            for (const documento of documentos) {
                for (const detalle of documento.detalle) {
                    csv.push([
                        documento.documento,
                        documento.createdAt,
                        documento.observaciones,
                        documento.proveedor.text,
                        detalle.cantidad,
                        detalle.descripcion,
                        detalle.subtotal,
                        detalle.total
                    ]);
                }
            }
            blob = Buffer.from(csv.generate()).toString('base64')
        } else if (id == 'customers') {
            // Reporte de pedidos de clientes (2)
            const header = ['Documento', 'Fecha', 'Observaciones', 'Cliente', 'Cantidad', 'Producto', 'Subtotal', 'Total'];
            const csv = new SimpleCSV({ header });
            const documentos = await repo.findByTipoDocumento(2);
            for (const documento of documentos) {
                for (const detalle of documento.detalle) {
                    csv.push([
                        documento.documento,
                        documento.createdAt,
                        documento.observaciones,
                        documento.cliente.text,
                        detalle.cantidad,
                        detalle.descripcion,
                        detalle.subtotal,
                        detalle.total
                    ]);
                }
            }
            blob = Buffer.from(csv.generate()).toString('base64')
        }

        return res.json({ blob, filename }, 201);
    }
}

module.exports = ReportesController;