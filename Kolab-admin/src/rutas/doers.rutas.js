const express = require('express');
const rutas = express.Router()

const { mostrar, Mandar, ListaCompleta, lista, detalle, eliminar, traer, modificar } = require('../controladores/doers.controlador');
const { isLoggedIn } = require('../lib/auth');

rutas.get('/agregar/:id', isLoggedIn, mostrar)
rutas.post('/agregar/:id', isLoggedIn, Mandar)
rutas.get('/listaCompleta/:id', isLoggedIn, ListaCompleta)
rutas.get('/Lista/:id', isLoggedIn, lista)
rutas.get('/detalle/:id', isLoggedIn, detalle)
rutas.get('/Eliminar/:id', isLoggedIn, eliminar)
rutas.get('/editar/:id', isLoggedIn, traer)
rutas.post('/editar/:id', isLoggedIn, modificar)

module.exports = rutas