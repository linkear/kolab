const doersControlador = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

doersControlador.mostrar = async (req, res) => {
    const id = req.user.idUsuarios
    const kolab = await sql.query('select max(idKolab) from kolabs where usuarioIdUsuarios = ?', [id])
    const proyecto = await sql.query('select idProyecto  from proyectos where usuarioIdUsuarios = ?', [id])
    const rol = await sql.query('select r.nombreRol from rols r join detallerols d on  d.RolIdRol = r.idRol WHERE d.usuarioIdUsuarios = ?', [id])
    res.render('doers/doersAgregar', { kolab, proyecto, rol });
}

doersControlador.Mandar = async (req, res) => {
    const id  = req.params.id
    const ids = req.user.idUsuarios
    const {Cedula, NombreDoers, Edad, Telefono, DescripcionDoers, Kolab, idProyecto, rol} = req.body
    const nuevoEnvio = {
        Cedula,
        NombreDoers,
        Edad,
        Telefono,
        DescripcionDoers,
        KolabIdKolab: Kolab,
        ProyectoIdProyecto: idProyecto,
        usuarioIdUsuarios: ids
    }
    await orm.doers.create(nuevoEnvio)
    req.flash('success', 'Guardado exitoso')
    if (rol === 'administrador') {
        res.redirect('/doers/listaCompleta/' + ids);
    } else {
        if (rol === 'doers') {
            res.redirect('/doers/Lista/' + id);
        }
    }
}

doersControlador.ListaCompleta = async (req, res) => {
    const doers = await sql.query('select * from doers')
    res.render('doers/listaDoers', {doers})
}

doersControlador.lista = async (req, res) => {
    const id = req.params.id
    const proyecto = await sql.query('select idProyecto from proyectos where idProyecto = ?', [id])
    const doers = await sql.query('select * from doers where ProyectoIdProyecto = ?', [id])
    res.render('doers/integrantes', { doers, proyecto })
}

doersControlador.detalle = async (req, res) => {
    const id = req.params.id
    const doers = await sql.query('select * from doers where idDoers = ?', [id])
    res.render('doers/doers', { doers })
}

doersControlador.eliminar = async (req, res) => {
    const id = req.params.id
    await orm.doers.destroy({ where: { idDoers: id } });
    req.flash('success', 'Se Elimino Correctamente');
    res.redirect('/doers/listaCompleta/' + id);
}

doersControlador.traer = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    const doers = await sql.query('select * from doers where idDoers = ?', [id])
    const rol = await sql.query('select r.nombreRol from rols r join detallerols d on  d.RolIdRol = r.idRol WHERE d.usuarioIdUsuarios = ?', [ids])
    res.render('doers/doersEditar',{ doers, rol})
}

doersControlador.modificar = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    const { Cedula, NombreDoers, Edad, Telefono, DescripcionDoers, rol } = req.body
    const nuevoEnvio = {
        Cedula,
        NombreDoers,
        Edad,
        Telefono,
        DescripcionDoers,
        usuarioIdUsuarios: ids
    }
    if (rol === 'administrador') {
        await orm.doers.findOne({ where: { idDoers: ids } })
            .then(actualizarEnvio => {
                actualizarEnvio.update(nuevoEnvio)
                req.flash('success', 'Se actualizo con exito')
                res.redirect('/doers/listaCompleta/' + id);
            })
    } else {
        if (rol === 'doers') {
            await orm.doers.findOne({ where: { idDoers: ids } })
                .then(actualizarEnvio => {
                    actualizarEnvio.update(nuevoEnvio)
                    req.flash('success', 'Se actualizo con exito')
                    res.redirect('/doers/Lista/' + id);
                })
        }
    }
}

module. exports = doersControlador