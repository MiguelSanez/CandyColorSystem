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
    }
  }
  Documento.init({
    idCliente: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    idProveedor: DataTypes.INTEGER,
    tipoDocumento: DataTypes.INTEGER,
    // documentoProveedor: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT,
    impuestos: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    observaciones: DataTypes.STRING,
    serie: DataTypes.STRING,
    folio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'documento',
    tableName: 'documentos',
  });
  return Documento;
};

module.exports.TIPO_DOCUMENTO = {'VENTA':0, 'COMPRA':1, 'PEDIDO':2};
