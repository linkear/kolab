const express = require('express');
const rutas = express.Router()

const {mostrar, mandar, Lista, mostrarEdicion, actualizar, siguiente} = require('../controladores/kolab.controlador');
const { isLoggedIn } = require('../lib/auth');

rutas.get('/agregar/', isLoggedIn, mostrar)
rutas.post('/agregar/', isLoggedIn, mandar)
rutas.get('/lista/:id', isLoggedIn, Lista)
rutas.get('/editar/:id', isLoggedIn, mostrarEdicion)
rutas.post('/editar/:id', isLoggedIn, actualizar)
rutas.post('/siguiente/', isLoggedIn, siguiente)


module.exports= rutas