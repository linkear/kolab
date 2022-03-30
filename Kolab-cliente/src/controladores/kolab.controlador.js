const kolabCtl = {}

const sql = require('../configuracionBaseDatos/baseDatos.sql')

kolabCtl.mostrar = async(req, res) => {
    const id = req.params.id
    const Kolab = await sql.query('SELECT * FROM kolabs WHERE idKolab = ?', [id])
    const proyectos = await sql.query('SELECT DISTINCT * FROM listakolab WHERE KolabIdKolab = ?', [id])
    const doers = await sql.query('SELECT DISTINCT * FROM listakolab WHERE KolabIdKolab = ?', [id])
    const comunidad = await sql.query('SELECT DISTINCT * FROM proyectocomunidad WHERE KolabIdKolab = ?', [id])
    const capitalizacion = await sql.query('SELECT DISTINCT * FROM capitalizaciones WHERE KolabIdKolab = ?', [id])
    res.render('Kolab/kolab', { Kolab, proyectos, doers, comunidad, capitalizacion });
}

module.exports = kolabCtl