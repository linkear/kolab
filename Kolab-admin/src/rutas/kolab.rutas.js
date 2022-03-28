const express = require('express');
const rutas = express.Router()

const {mostrar, mandar, Lista, mostrarEdicion, actualizar, siguiente} = require('../controladores/kolab.controlador')

rutas.get('/agregar/', mostrar)
rutas.post('/agregar/', mandar)
rutas.get('/lista/:id', Lista)
rutas.get('/editar/:id', mostrarEdicion)
rutas.post('/editar/:id', actualizar)
rutas.post('/siguiente/', siguiente)


module.exports= rutas