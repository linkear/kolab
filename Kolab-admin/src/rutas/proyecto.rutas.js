const express = require('express');
const rutas = express.Router()

const {Mostrar, Mandar, MostarProyecto, ListaTodo, ListaDetalle, eliminarProyecto, actualizarProyectos, EliminarObjetivo} = require('../controladores/proyecto.controlador');
const { isLoggedIn } = require('../lib/auth');

rutas.get('/agregar/:id', isLoggedIn ,Mostrar)
rutas.post('/agregar/:id', isLoggedIn ,Mandar)
rutas.get('/Lista/:id', isLoggedIn ,ListaTodo)
rutas.get('/Lista/detalle/:id', isLoggedIn ,ListaDetalle)
rutas.get('/Eliminar/:id', isLoggedIn ,eliminarProyecto)
rutas.get('/EliminarObjetivo/:id', isLoggedIn ,EliminarObjetivo)
rutas.get('/Editar/:id', isLoggedIn ,MostarProyecto)
rutas.post('/Editar/:id', isLoggedIn ,actualizarProyectos)



module.exports= rutas