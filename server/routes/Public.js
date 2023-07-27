const express = require('express');
publicRouter = express.Router();

publicRouter.get('/', function(req, res) {
    res.render('before_auth/Sign-in.ejs');
});

module.exports = publicRouter;