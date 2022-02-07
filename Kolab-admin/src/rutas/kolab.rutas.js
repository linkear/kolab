const express = require('express');
const rutas = express.Router()

const {mostrar, mandar, Lista, mostrarEdicion} = require('../controladores/kolab.controlador')

rutas.get('/agregar/', mostrar)
rutas.post('/agregar/', mandar)
rutas.get('/lista/:id', Lista)
rutas.get('/editar/:id', mostrarEdicion)

module.exports= rutas