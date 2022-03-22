const express = require('express');
const rutas = express.Router()

const { mostrar, mandar, lista, Editar, Actualizar } = require('../controladores/capitalizacion.controlador')

rutas.get('/agregar/:id', mostrar)
rutas.post('/agregar/:id', mandar)
rutas.get('/lista/:id', lista)
rutas.get('/editar/:id', Editar)
rutas.post('/editar/:id', Actualizar)

module.exports = rutas