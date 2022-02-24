const authCtrl = {};

const sql = require('../configuracionBaseDatos/baseDatos.sql')
const passport = require('passport');

authCtrl.mostrarRegistro = (req, res) => {
    res.render('usuario/registro');
};

authCtrl.registro = passport.authenticate('local.signup', {
    successRedirect: '/CerrarSecion',
    failureRedirect: '/registro',
    failureFlash: true
});

authCtrl.mostrarLogin = async(req, res, next) => {
    const id = req.params.id
    const datos = await sql.query('select username from usuarios where idUsuarios = ?' ,[id])
    res.render('usuario/login', {datos});
};

authCtrl.ingreso = passport.authenticate('local.signin', {
    successRedirect: '/Kolab/agregar/',
    failureRedirect: '/login',
    failureFlash: true
});

authCtrl.cierreSeccion = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};

module.exports = authCtrl;