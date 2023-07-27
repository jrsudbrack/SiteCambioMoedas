const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const DAOUsuario = require('../database/DAO_User');


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Busque o usuário pelo nome de usuário usando a model DAOUsuario
      const user = await DAOUsuario.findByUsername(username);
      // Se o usuário não for encontrado ou a senha estiver incorreta
      if (user.blocked){
        return done(null, false, { message: 'Usuário bloqueado.' });
      }
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Usuário ou senha incorretos.' });
      }

      // Se o usuário e a senha estiverem corretos, retorne o usuário
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialização do usuário
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialização do usuário
passport.deserializeUser(async (id, done) => {
  try {
    const user = await DAOUsuario.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
