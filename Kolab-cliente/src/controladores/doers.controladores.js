const doers = {}
const sql = require('../configuracionBaseDatos/baseDatos.sql')

doers.mostrar = async(req, res) =>{
    const id = req.params.id
    const doers = await sql.query('select DISTINCT * from listakolab where idDoers = ?', [id])
    res.render('doers/doers', {doers});
}

module.exports = doers