const express = require('express');
const rutas = express.Router()

const {mostrar, mandar} = require('../controladores/actulizacionDatos.controlador')
const { isLoggedIn } = require('../lib/auth')

rutas.get('/Datos/:id', isLoggedIn ,mostrar)
rutas.post('/Datos/', isLoggedIn ,mandar)

module.exports = rutas
