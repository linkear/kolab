const express = require('express');
const rutas = express.Router()

const { mostrar, Mandar, ListaCompleta, lista, detalle, eliminar, traer, modificar } = require('../controladores/doers.controlador')

rutas.get('/agregar/:id', mostrar)
rutas.post('/agregar/:id', Mandar)
rutas.get('/listaCompleta/:id', ListaCompleta)
rutas.get('/Lista/:id', lista)
rutas.get('/detalle/:id', detalle)
rutas.get('/Eliminar/:id', eliminar)
rutas.get('/editar/:id', traer)
rutas.post('/editar/:id', modificar)

module.exports = rutas