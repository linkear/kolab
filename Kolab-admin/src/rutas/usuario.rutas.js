const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const { mostrar } = require('../controladores/kolab.controlador');

router.get('/Kolab/agregar/', isLoggedIn, mostrar);

module.exports = router;  