const express = require('express');
const rutas = express.Router()

const { mostrar } = require('../controladores/kolab.controlador')

rutas.get('/Lista/:id', mostrar)

module.exports = rutas