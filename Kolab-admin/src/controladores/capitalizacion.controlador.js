const capitalizadorctl = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

capitalizadorctl.mostrar = (req, res) => {
    res.render('capitalizacion/capitalizacionAgregar');
}

capitalizadorctl.mandar = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    const { nombreCapitalizador, descripcionCapitalizador } = req.body
    const nuevoEnvio = {
        nombreCapitalizador,
        descripcionCapitalizador
    }
    await orm.capitalizacion.create(nuevoEnvio)
    req.flash('success', 'Guardado con exito')
    res.redirect('/capitalizacion/lista/' + ids);
}

capitalizadorctl.lista = async (req, res) => {
    const lista = await sql.query('select * from capitalizaciones')
    res.render('capitalizacion/capitalizacion', { lista })
}

capitalizadorctl.Editar = async (req, res) => {
    const id = req.user.idUsuarios
    const traer = await sql.query('select * from capitalizaciones where idCapitalizacion = ?', [id])
    res.render('capitalizacion/capitalizacionEditar', { traer })
}

capitalizadorctl.Actualizar = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    const { nombreCapitalizador, descripcionCapitalizador } = req.body
    const nuevoEnvio = {
        nombreCapitalizador,
        descripcionCapitalizador
    }
    await orm.capitalizacion.findOne({ where: { idCapitalizacion: id } })
        .then(Actualizacion => {
            Actualizacion.update(nuevoEnvio)
            req.flash('success', 'Guardado con exito')
            res.redirect('/capitalizacion/lista/' + ids);
        })
}


module.exports = capitalizadorctl