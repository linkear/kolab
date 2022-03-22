const express = require('express');
const rutas = express.Router()

const { mostrar, Mandar, listaComunidad, lista, Traer, Editar } = require('../controladores/comunidad.controlador')

rutas.get('/agregar/:id', mostrar)
rutas.post('/agregar/:id', Mandar)
rutas.get('/listaCompleta/:id', listaComunidad)
rutas.get('/lista/:id', lista)
rutas.get('/editar/:id', Traer)
rutas.post('/editar/:id', Editar)

module.exports = rutas