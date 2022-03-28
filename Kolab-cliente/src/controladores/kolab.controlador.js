const kolabCtl = {}

const sql = require('../configuracionBaseDatos/baseDatos.sql')

kolabCtl.mostrar = async(req, res) => {
    const id = req.params.id
    const Kolab = await sql.query('SELECT * FROM kolabs WHERE idKolab = ?', [id])
    res.render('Kolab/kolab', { Kolab });
}

module.exports = kolabCtl