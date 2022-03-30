const comunidadCtl = {}

const sql = require('../configuracionBaseDatos/baseDatos.sql')
const orm = require('../configuracionBaseDatos/baseDatos.orm')


comunidadCtl.mostrar = async (req, res) => {
    const id =  req.params.id
    const proyecto = await sql.query('select idProyecto, NombreProyecto from proyectos where idProyecto = ?', [id])
    const comunidad = await sql.query('select max(idComunidad) from comunidades where ProyectoIdProyecto = ?', [id])
    console.log(id)
    res.render('comunidad/comindadAgregar', {comunidad, proyecto});
}

comunidadCtl.Mandar = async (req, res) => {
    const id = req.user.idUsuarios
    const { NombreComunidad, DescripcionComunidad, participantes, telefonoParticipante, proyecto, numero } = req.body
    const nuevoEnvio = {
        NombreComunidad,
        DescripcionComunidad,
        ProyectoIdProyecto: proyecto
    } 
    const nuevoDetalle = {
        participantes,
        telefonoParticipante,
        comunidadeIdComunidad: numero,
    }
    await orm.comunidad.create(nuevoEnvio)
    await orm.detalleComunidad.create(nuevoDetalle)
    req.flash('success', 'Se guardo con exito')
    res.redirect('/comunidad/listaCompleta/' + proyecto);
}

comunidadCtl.listaComunidad = async (req, res) => {
    const id = req.params.id
    const comunidad = await sql.query('select * from comunidades where ProyectoIdProyecto = ?', [id])
    res.render('comunidad/comunidadTotales', { comunidad })
}

comunidadCtl.lista = async (req, res) => {
    const id = req.params.id
    const detalle = await sql.query('select * from comunidades where idComunidad = ?', [id])
    const datosExtra = await sql.query('select * from detallecomunidads where comunidadeIdComunidad = ?', [id]) 
    res.render('comunidad/comunidad', { detalle, datosExtra})
}

comunidadCtl.Traer = async(req, res) => {
    const id = req.params.id
    const traer = await sql.query('select * from comunidades where idComunidad = ?', [id])
    res.render('comunidad/comunidadEditar', { traer })
}

comunidadCtl.Editar = async(req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    const { NombreComunidad, DescripcionComunidad, participantes, telefonoParticipante } = req.body
    const nuevoEnvio = {
        NombreComunidad,
        DescripcionComunidad
    }
    const nuevoDetalle = {
        participantes,
        telefonoParticipante
    }
    await orm.comunidad.findOne({ where: { idComunidad: id } })
        .then(actualizacion => {
            actualizacion.update(nuevoEnvio)
        })
    await orm.detalleComunidad.findOne({ where: { idComunidad: id } })
        .then(actualizacion => {
            actualizacion.update(nuevoDetalle)
            req.flash('success', 'Se guardo con exito')
            res.redirect('/comunidad/listaCompleta/' + ids);
        })
}


module.exports = comunidadCtl