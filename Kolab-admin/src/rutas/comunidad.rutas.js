const express = require('express');
const rutas = express.Router()

const { mostrar, Mandar, listaComunidad, lista, Traer, Editar } = require('../controladores/comunidad.controlador');
const { isLoggedIn } = require('../lib/auth');

rutas.get('/agregar/:id', isLoggedIn, mostrar)
rutas.post('/agregar/:id', isLoggedIn, Mandar)
rutas.get('/listaCompleta/:id', isLoggedIn, listaComunidad)
rutas.get('/lista/:id', isLoggedIn, lista)
rutas.get('/editar/:id', isLoggedIn, Traer)
rutas.post('/editar/:id', isLoggedIn, Editar)

module.exports = rutas