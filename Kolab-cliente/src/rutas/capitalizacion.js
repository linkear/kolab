const express = require('express');
const rutas = express.Router()

const { mostrar } = require('../controladores/capitalizacion.controladores')

rutas.get('/detalle/:id', mostrar)

module.exports = rutas