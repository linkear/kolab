const authCtrl = {};

const passport = require('passport');

authCtrl.renderSignUp = (req, res) => {
    res.render('usuario/registro');
};

authCtrl.signUp = passport.authenticate('local.signup', {
    successRedirect: '/CerrarSecion',
    failureRedirect: '/registro',
    failureFlash: true
});

authCtrl.renderSignIn = (req, res, next) => {
    res.render('usuario/login');
};

authCtrl.signIn = passport.authenticate('local.signin', {
    successRedirect: '/Kolab/agregar/',
    failureRedirect: '/login',
    failureFlash: true
});

authCtrl.cierreSeccion = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};

module.exports = authCtrl;