const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Configurando o caminho das visualizações
app.set('views', path.join(__dirname, '/server/views'));

// Define o motor de visualização que o Express utilizará
app.set('view engine', 'ejs');

// Compartilhando a pasta public com usuario
const public = path.join(__dirname, "public");
app.use(express.static(public));

// Configurando o uso de JSON
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurando o Express para aceitar sessoes do usuario
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({
  secret: 'gato de botas',
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires: 60000
  }
}));
const passport = require('./server/utils/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Importar as rotas
const publicRouter = require('./server/routes/Public');
const userRouter = require('./server/routes/User');
/*const walletRouter = require('./server/routes/Wallet');
const withdrawRouter = require('./server/routes/Withdraw');
const administratorRouter = require('./server/routes/Administrator');*/

app.use('/', publicRouter);
app.use('/v2', userRouter);
/*app.use('/v2', walletRouter);
app.use('/v2', withdrawRouter);
app.use('/v2', administratorRouter);*/


app.listen(PORT, () =>{console.log(`server listening on port ${PORT}`);});