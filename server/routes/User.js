const express = require('express');
userRouter = express.Router();
const userController = require('../controllers/User');
const passport = require('../utils/passport');

// Rotas GET
  // Rota Home 
  userRouter.get('/home', userController.home);

  // Rota Carteira
  userRouter.get('/carteira', userController.carteira);
  
  // Rota Logoff
  userRouter.get('/sair', userController.sair);


// Rotas POST
  // Rota Login
  userRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/v2/home',
    failureRedirect: '/',
  }));

  // Rota Cadastro
  userRouter.post('/cadastro', userController.cadastro);

  // Rota Comprar
  userRouter.post('/comprar', userController.comprar);



module.exports = userRouter;