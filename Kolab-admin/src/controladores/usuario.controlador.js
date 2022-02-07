const userCtrl = {};

const sql = require('../configuracionBaseDatos/baseDatos.sql');

userCtrl.mostrar = async(req, res, next) => {
  res.render('Kolab/kolabAgregar');
}

module.exports = userCtrl;