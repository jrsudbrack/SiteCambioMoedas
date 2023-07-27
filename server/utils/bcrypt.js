const bcrypt = require('bcrypt');

// for bycript
const saltRounds = 10;

async function criptografarSenha(senha){
    senhaCriptografada = await bcrypt.hash(senha, saltRounds);
    return senhaCriptografada;
};


module.exports = {criptografarSenha}