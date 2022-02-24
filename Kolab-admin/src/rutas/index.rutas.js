const express = require('express');
const rutas = express.Router()

const{ mostrar, Verificar } = require('../controladores/index.controlador')

rutas.get('/', mostrar)
rutas.post('/',Verificar)

module.exports = rutas