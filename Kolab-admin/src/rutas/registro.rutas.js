const express = require('express');
const router = express.Router();

const { cierreSeccion, mostrarLogin, ingreso, mostrarRegistro, registro } = require('../controladores/registro.controlador')

// SIGNUP
router.get('/Registro', mostrarRegistro);
router.post('/Registro', registro);

// SINGIN
router.get('/Login/:id', mostrarLogin);
router.post('/Login/', ingreso);

router.get('/cerrarSecion', cierreSeccion);

module.exports = router;