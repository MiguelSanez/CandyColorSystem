'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Producto.init({
    esMateria: DataTypes.BOOLEAN,
    descripcion: DataTypes.STRING,
    codigo: DataTypes.STRING,
    existencia: DataTypes.FLOAT,
    costo: DataTypes.FLOAT,
    precio: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'producto',
    tableName: 'productos',
  });
  return Producto;
};