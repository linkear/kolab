const express = require('express');
const rutas = express.Router()

const { mostrar, mandar, lista, Editar, Actualizar } = require('../controladores/capitalizacion.controlador');
const { isLoggedIn } = require('../lib/auth');

rutas.get('/agregar/:id', isLoggedIn,mostrar)
rutas.post('/agregar/:id', isLoggedIn,mandar)
rutas.get('/lista/:id', isLoggedIn,lista)
rutas.get('/editar/:id', isLoggedIn,Editar)
rutas.post('/editar/:id', isLoggedIn,Actualizar)

module.exports = rutas