const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/connection')


const Usuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    administrador: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });


/*sequelize.sync({ alter: true })
  .then(() => {
    console.log('_POSTGRES->user model synced!');
  })
  .catch((error) => {
    console.error('_POSTGRES->user model error on sync!', error);
  });
*/
module.exports = Usuario;