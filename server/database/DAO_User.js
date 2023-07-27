const Usuario = require('../models/Usuario');
const Carteira = require('../models/Carteira');


class DAOUsuario {
  
  static async findByUsername(username) {
    return await Usuario.findOne({
      where: {
        email: username,
      },
    });
  }
  static async findByPk(Pk) {
    return await Usuario.findOne({
      where: {
        id: Pk,
      },
    });
  }

  async criaUsuario(nome, email, senha, cpf) {
    let dadosUsuario = {
      fullname: nome,
      email: email,
      password: senha,
      CPF: cpf,
    };

    try {
      let usuario = await Usuario.create(dadosUsuario);
      await this.criaCarteira(usuario.id);
      return true;
    } catch (error) {
      console.log('Ocorreu um erro ao criar um novo usuário:', error);
      return false;
    }
  }

  async criaCarteira(id_user) {
    let novoUsuario = {
      usuarioId: id_user,
    };

    try {
      await Carteira.create(novoUsuario);
      return true;
    } catch (error) {
      console.log('Ocorreu um erro ao criar a nova carteira:', error);
      return false;
    }
  }
  async mostraCarteira (id_user){
    let carteira = await Carteira.findOne({
      where: {usuarioId : id_user}
    });
    const myjson = {
      "dolar": carteira.dolar,
      "libra": carteira.libraEsterlina,
      "euro": carteira.euro,
      "real": carteira.saldo,
    }
    return myjson;
  };

  async comprar (valor, tipo, id_user, conversao){
    let carteira = await Carteira.findOne({
      where: {usuarioId : id_user}
    });
    if (carteira.saldo >= parseFloat(valor)){
      let novoSaldoEstrangeiro = parseFloat(carteira[tipo]) + conversao
      let novoSaldo = carteira.saldo - valor;
      await Carteira.update({ saldo: novoSaldo}, { where: { usuarioId: id_user } });
      await Carteira.update({ [tipo]: novoSaldoEstrangeiro }, { where: { usuarioId: id_user } });
      return true;
    }else{
      return false;
    }
  };

}

module.exports = DAOUsuario;