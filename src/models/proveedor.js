'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Proveedor.init({
    nombre: DataTypes.STRING,
    rfc: DataTypes.STRING,
    referencia: DataTypes.STRING,
    telefono: DataTypes.STRING,
    calle: DataTypes.STRING,
    numero: DataTypes.STRING,
    colonia: DataTypes.STRING,
    codigoPostal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'proveedor',
    tableName: 'proveedores',
  });
  return Proveedor;
};