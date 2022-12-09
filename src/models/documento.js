'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Documento.belongsTo(models.cliente, { foreignKey: 'idCliente', as: 'cliente' });
    }
  }
  Documento.init({
    idCliente: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    idProveedor: DataTypes.INTEGER,
    tipoDocumento: DataTypes.INTEGER,
    // documentoProveedor: DataTypes.INTEGER,
    serie: DataTypes.STRING,
    folio: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT,
    impuestos: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    observaciones: DataTypes.STRING,
    documento: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.serie}-${this.folio}`;
      },
      set() { }
    }
  }, {
    sequelize,
    modelName: 'documento',
    tableName: 'documentos',
  });
  return Documento;
};

module.exports.TIPO_DOCUMENTO = {
  venta: {
    id: 0,
    nombre: 'Venta',
    serie: 'T',
  },
  compra: {
    id: 1,
    nombre: 'Compra',
    serie: 'C',
  },
  pedido: {
    id: 2,
    nombre: 'Pedido',
    serie: 'P',
  }
};
