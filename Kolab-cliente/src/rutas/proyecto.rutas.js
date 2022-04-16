const express = require('express');
const rutas = express.Router()

const { mostrar } = require('../controladores/poryecto.controlador') 

rutas.get('/lista/:id', mostrar)

module.exports = rutas