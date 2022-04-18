const capitalizadorCtl = {}
const sql = require('../configuracionBaseDatos/baseDatos.sql')
const orm = require('../configuracionBaseDatos/baseDatos.orm')

capitalizadorCtl.mostrar = async(req, res) => {
    const id = req.params.id
    const capitalizador = await sql.query('select * from capitalizaciones where idCapitalizacion = ?', [id])
    res.render('capitalizacion/capitalizacionDetalle',{capitalizador});
}

module.exports = capitalizadorCtl