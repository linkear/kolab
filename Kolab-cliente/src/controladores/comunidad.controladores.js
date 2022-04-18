const comunidadCtl = {}
const sql = require('../configuracionBaseDatos/baseDatos.sql')
const orm = require('../configuracionBaseDatos/baseDatos.orm')

comunidadCtl.mostrar = async(req, res) =>{
    const id = req.params.id
    const comunidad = await sql.query('select DISTINCT * from proyectocomunidad where ProyectoIdProyecto = ?', [id])
    res.render('comunidades/comunidades', {comunidad});
}

comunidadCtl.Detalle = async(req, res)=>{
    const id = req.params.id
    const comunidadDetalle = await sql.query('select DISTINCT * from proyectocomunidad where idComunidad = ?', [id])
    res.render('comunidades/comunidadDetalle', {comunidadDetalle})
}

module.exports = comunidadCtl