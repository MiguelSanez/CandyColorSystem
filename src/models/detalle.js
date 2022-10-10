'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Detalle.init({
    idDocumento: DataTypes.INTEGER,
    idProducto: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    cantidad: DataTypes.FLOAT,
    subtotal: DataTypes.FLOAT,
    impuestos: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    costo: DataTypes.FLOAT,
    precio: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'detalle',
    tableName: 'detalles'
  });
  return Detalle;
};