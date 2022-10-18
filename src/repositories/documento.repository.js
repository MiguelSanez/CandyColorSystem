const db = require('./../models');

class DocumentoRepository {

    async find() {
        const documentos = await db.documento.findAll();
        return documentos;
    }

    async findUserById(id) {
        const documento = await db.documento.findOne({
            where: { id },
        });

        return documento;
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

module.exports = DocumentoRepository;