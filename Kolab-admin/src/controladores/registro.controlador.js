const authCtrl = {};

const sql = require('../configuracionBaseDatos/baseDatos.sql')
const passport = require('passport');

authCtrl.mostrarRegistro = async (req, res) => {
    const contador = await sql.query('select max(contador) from contadors')
    res.render('usuario/registro', { contador });
};

authCtrl.registro = passport.authenticate('local.signup', {
    successRedirect: '/CerrarSesion', 
    failureRedirect: '/registro',
    failureFlash: true
});

authCtrl.mostrarLogin = async (req, res, next) => {
    const id = req.params.id
    const datos = await sql.query('select username from usuarios where idUsuarios = ?', [id])
    const rol = await sql.query('select RolIdRol from detallerols where usuarioIdUsuarios = ?', [id])
    res.render('usuario/login', { datos, rol });
};

authCtrl.ingreso = passport.authenticate('local.signin', {
    successRedirect: '/Kolab/agregar/',
    failureRedirect: '/login',
    failureFlash: true
});

authCtrl.ingreso1 = passport.authenticate('local.signin', {
    successRedirect: '/proyecto/agregar/',
    failureRedirect: '/login',
    failureFlash: true
});

authCtrl.cierreSeccion = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};

module.exports = authCtrl;