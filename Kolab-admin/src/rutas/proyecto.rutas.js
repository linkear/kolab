const express = require('express');
const rutas = express.Router()

const {Mostrar, Mandar, MostarProyecto, ListaTodo, ListaDetalle, eliminarProyecto, actualizarProyectos} = require('../controladores/proyecto.controlador')

rutas.get('/agregar/:id', Mostrar)
rutas.post('/agregar/:id', Mandar)
rutas.get('/Lista/:id', ListaTodo)
rutas.get('/Lista/detalle/:id', ListaDetalle)
rutas.get('/Eliminar/:id',eliminarProyecto)
rutas.get('/Editar/:id', MostarProyecto)
rutas.post('/Editar/:id', actualizarProyectos)



module.exports= rutas