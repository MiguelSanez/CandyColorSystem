'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCliente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes',
          key: 'id',
        },
        allowNull: true,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id',
        }
      },
      idProveedor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'proveedores',
          key: 'id',
        },
        allowNull: true,
      },
      tipoDocumento: {
        type: Sequelize.INTEGER
      },
      // documentoProveedor: {
      //   type: Sequelize.INTEGER
      // },
      status: {
        type: Sequelize.INTEGER
      },
      subtotal: {
        type: Sequelize.FLOAT
      },
      impuestos: {
        type: Sequelize.FLOAT
      },
      total: {
        type: Sequelize.FLOAT
      },
      observaciones: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('documentos');
  }
};