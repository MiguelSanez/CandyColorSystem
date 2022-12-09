const db = require('./../models');

class DocumentosRepository {

    async find() {
        const documentos = await db.documento.findAll({
            where: { status: 1 },
            include: ['cliente', 'proveedor'],
        });
        return documentos;
    }

    async findByTipoDocumento(tipoDocumento) {
        const documentos = await db.documento.findAll({
            where: { tipoDocumento, status: 1, },
            include: ['cliente', 'proveedor', 'detalle'],
        });
        return documentos;
    }

    async findOneById(id) {
        const documento = await db.documento.findOne({
            where: { id },
        });

        return documento;
    }

    async findFolioByType(tipoDocumento) {
        const folio = await db.documento.count({
            where: {
                tipoDocumento,
            }
        });
        return folio + 1;
    }

    async add(documento) {
        documento.id = 0;
        return (await documento.save());
    }

    async update(documento) {
        if (documento.id <= 0)
            throw new Error('Expecting document to have a valid id.');

        return (await documento.save());
    }

    async delete(documento) {
        return (await documento.destroy());
    }


};

module.exports = DocumentosRepository;