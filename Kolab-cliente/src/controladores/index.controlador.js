const kolab = {}

const sql = require('../configuracionBaseDatos/baseDatos.sql')

kolab.mostrar = async(req, res)=>{
    const Kolab = await sql.query('select * from kolabs')
    const Objetivos = await sql.query('select * from detalleKolabs')
    res.render('index', {Kolab, Objetivos});
}

module.exports = kolab