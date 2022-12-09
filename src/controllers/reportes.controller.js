const { DocumentosRepository, DetallesRepository } = require('../repositories');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TIPO_DOCUMENTO } = require('../models/documento');


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
}

module.exports = ReportesController;