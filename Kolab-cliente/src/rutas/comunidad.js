const express = require('express');
const rutas = express.Router()

const { mostrar, Detalle } = require('../controladores/comunidad.controladores')

rutas.get('/lista/:id', mostrar)
rutas.get('/detalle/:id', Detalle)

module.exports = rutas