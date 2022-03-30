const express = require('express');
const rutas = express.Router()

const {Mostrar, Mandar, MostarProyecto, ListaTodo, ListaDetalle, eliminarProyecto, actualizarProyectos, EliminarObjetivo, aumentar} = require('../controladores/proyecto.controlador')

rutas.get('/agregar/:id', Mostrar)
rutas.post('/agregar/:id', Mandar)
rutas.get('/Lista/:id', ListaTodo)
rutas.get('/Lista/detalle/:id', ListaDetalle)
rutas.get('/Eliminar/:id',eliminarProyecto)
rutas.post('/Aumentar/:id', aumentar)
rutas.get('/EliminarObjetivo/:id',EliminarObjetivo)
rutas.get('/Editar/:id', MostarProyecto)
rutas.post('/Editar/:id', actualizarProyectos)



module.exports= rutas