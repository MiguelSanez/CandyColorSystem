'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  Cliente.init({
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
    modelName: 'cliente',
    tableName: 'clientes',
  });
  return Cliente;
};