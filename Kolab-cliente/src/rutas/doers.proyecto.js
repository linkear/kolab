const express = require('express');
const rutas = express.Router()

const { mostrar } = require('../controladores/doers.controladores')

rutas.get('/lista/:id', mostrar)

module.exports = rutas