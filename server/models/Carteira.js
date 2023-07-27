const { DataTypes } = require('sequelize')
const {sequelize} = require('../database/connection')
const Usuario = require('./Usuario')

const Carteira = sequelize.define('carteira', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    saldo: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    euro: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    dolar: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    libraEsterlina: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    }
});

Carteira.belongsTo(Usuario, { foreignKey: 'usuarioId' });

/*sequelize.sync({ alter: true })
  .then(() => {
    console.log('_POSTGRES->wallet model synced!');
  })
  .catch((error) => {
    console.error('_POSTGRES->wallet model error on sync!', error);
  });
*/
module.exports = Carteira;