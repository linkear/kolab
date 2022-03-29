const kolabCtl = {}

const sql = require('../configuracionBaseDatos/baseDatos.sql')

kolabCtl.mostrar = async(req, res) => {
    const id = req.params.id
    const Kolab = await sql.query('SELECT * FROM kolabs WHERE idKolab = ?', [id])
    const proyectos = await sql.query('SELECT DISTINCT NombreProyecto FROM listakolab WHERE KolabIdKolab = ?', [id])
    const doers = await sql.query('SELECT DISTINCT NombreDoers FROM listakolab WHERE KolabIdKolab = ?', [id])
    const comunidad = await sql.query('SELECT DISTINCT NombreComunidad FROM listakolab WHERE KolabIdKolab = ?', [id])
    res.render('Kolab/kolab', { Kolab, proyectos, doers, comunidad });
}

module.exports = kolabCtl