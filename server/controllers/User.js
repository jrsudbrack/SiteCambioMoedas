const DAOUsuario = require('../database/DAO_User')
const { criptografarSenha } = require('../utils/bcrypt');
const { convertemoeda } = require('../utils/convertemoeda');

const objUsuario = new DAOUsuario;

// Rotas GET
const home = (req, res) => {
  if (req.isAuthenticated()) {
      res.render('after_auth/Home');
    } else {
      res.redirect('/');
    }
};

const carteira = async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('after_auth/Wallet', {wallet: await objUsuario.mostraCarteira(req.user.id)});
  } else {
    res.redirect('/');
  }
};

const sair = (req, res) => {
  if (req.isAuthenticated()) {
    req.logout(function(err) {
      if (err) {
        // Lida com erros, se houver
        console.error(err);
      }
      res.redirect('/'); // Redireciona para a página inicial após o logoff
    });
  } else {
    res.redirect('/'); // Se não estiver autenticado, apenas redirecione para a página inicial
  }
};




// Rotas POST
const cadastro = async (req, res) =>{
  nome = req.body.nome;
  email = req.body.email;
  cpf = req.body.cpf;
  
  await objUsuario.criaUsuario(nome, email, await criptografarSenha(req.body.senha), cpf);
  res.send('<script>alert("Usuario cadastrado com sucesso!"); window.location.href = "/"; </script>');
};

const comprar = async (req, res) => {
  if (req.isAuthenticated()) {
    valor = (req.body.valor).replace(/[,./]/g, '.');
    tipo = req.body.tipo;
    conversao = await convertemoeda(valor, tipo);
    if(await objUsuario.comprar(valor, tipo, req.user.id, conversao)){
      res.send('<script>alert("Compra realizada com sucesso!"); window.location.href = "/v2/carteira"; </script>');
    }else{
      res.send('<script>alert("Você não tem saldo suficiente para relizar essa operação!"); window.location.href = "/v2/carteira"; </script>');
    }
  }else{
    res.redirect('/');
  }
};



module.exports = {
                    home,
                    cadastro,
                    carteira,
                    sair,
                    comprar,
                }



