const tipoComunidad = {}

const sql = require('../configuracionBaseDatos/baseDatos.sql')
const orm = require('../configuracionBaseDatos/baseDatos.orm')

tipoComunidad.mostrar = (req, res) => {
    res.render('tipoComunidad/tipoComunidadAgregar');
}

tipoComunidad.Mandar = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    const { tipocomunidades } = req.body
    const nuevoEnvio = {
        tipocomunidades
    }
    await orm.tipoComunidad.create(nuevoEnvio)
    req.flash('success', 'Guardado con Exito')
    res.redirect('/tipoComunidad/lista/' + ids);
}

tipoComunidad.lista = async (req, res) => {
    const tipoComunidad = await sql.query('SELECT * FROM tipocomunidades')
    res.render('tipoComunidad/tipoComunidadLista', { tipoComunidad })
}

tipoComunidad.eliminar = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    await orm.tipoComunidad.destroy({ where: { idTipoComunidad: id } })
    res.redirect('/tipoComunidad/lista/' + ids);
}

tipoComunidad.traer = async (req, res) => {
    const id = req.params.id
    const tipoCominidad = await sql.query('select * from tipocomunidades where idTipoComunidad = ?', [id])
    res.render('tipoComunidad/tipoComunidadEditar', { tipoCominidad })
}

tipoComunidad.actualizar = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    const { tipocomunidades } = req.body
    const nuevaActualizacion = {
        tipocomunidades
    }
    await orm.tipoComunidad.findOne({ where: { idTipoComunidad: id } })
        .then(actualizar => {
            actualizar.update(nuevaActualizacion)
            req.flash('success', 'Guardado con Exito')
            res.redirect('/tipoComunidad/lista/' + ids);
        })
}

module.exports = tipoComunidad