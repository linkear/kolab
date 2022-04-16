const proyectoctl = {}

const sql = require('../configuracionBaseDatos/baseDatos.sql')
const orm = require('../configuracionBaseDatos/baseDatos.orm')

proyectoctl.mostrar = async(req, res) =>{
    const id = req.params.id
    const doers = await sql.query('select DISTINCT * from listakolab WHERE ProyectoIdProyecto = ?', [id])
    const proyecto = await sql.query('select * from listakolab WHERE idProyecto = ?', [id])
    const objetivos = await sql.query('select DISTINCT objetivos from listakolab WHERE ProyectoIdProyecto', [id])
    res.render('proyectos/proyectos', {doers, proyecto, objetivos});
}

module.exports = proyectoctl