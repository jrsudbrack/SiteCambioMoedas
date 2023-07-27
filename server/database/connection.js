const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('cambiodbV2', 'postgres', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false
});

function tryConnection(){
    sequelize
  .authenticate()
  .then(() => {
    console.log('_POSTGRES->connection successfully!');
  })
  .catch((err) => {
    console.error('_POSTGRES->error on connection!', err);
  });
}


module.exports.tryConnection = tryConnection;
module.exports.sequelize = sequelize;