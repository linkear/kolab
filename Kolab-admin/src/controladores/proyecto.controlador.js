const proyectocontrolador = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql');

proyectocontrolador.Mostrar = async (req, res) => {
    const id = req.params.id
    const rol = await sql.query('select r.nombreRol from rols r join detallerols d on  d.RolIdRol = r.idRol WHERE d.usuarioIdUsuarios = ?', [id])
    const idProyecto = await sql.query('select max(idProyecto) from proyectos')
    res.render('proyectos/proyectoAgregar', {
        rol,
        idProyecto
    });
}

proyectocontrolador.Mandar = async (req, res) => {
    const ids = req.user.idUsuarios
    const kolab = 1
    const { numeroProyecto, NombreProyecto, DecripcionProyecto, fechaProyecto, Vision, Mision, rol, objetivos, unico, numeros } = req.body
    const nuevoEnvio = {
        NombreProyecto,
        DecripcionProyecto,
        fechaProyecto,
        visionProyecto: Vision,
        MisionProyecto: Mision,
        KolabIdKolab: kolab,
        usuarioIdUsuarios: ids
    }
    await orm.proyecto.create(nuevoEnvio)
    if (parseInt(numeros) == 1) {
        await sql.query('INSERT INTO detalleproyectos(objetivos, ProyectoIdProyecto, usuarioIdUsuarios) VALUES (?,?,?)', [unico, numeroProyecto, ids])
    } else {
        if (parseInt(numeros) > 1) {
            for (let i = 0; i < objetivos.length; i++) {
                await sql.query('INSERT INTO detalleproyectos(objetivos, ProyectoIdProyecto, usuarioIdUsuarios) VALUES (?,?,?)', [objetivos[i], numeroProyecto, ids])
            }
        }
    }
    if (rol === 'administrador') {
        res.redirect('/proyecto/lista/' + kolab);
    } else {
        if (rol === 'doers') {
            res.redirect('/proyecto/Lista/detalle/' + numero);
        }
    }
}

proyectocontrolador.ListaTodo = async (req, res) => {
    const id = req.params.id
    const listaProyecto = await sql.query('SELECT * FROM proyectos WHERE KolabIdKolab = ?', [id])
    res.render('proyectos/proyecto', {
        listaProyecto
    })
}

proyectocontrolador.ListaDetalle = async (req, res) => {
    const id = req.params.id
    const detalle = await sql.query('SELECT * FROM detalleproyectos WHERE ProyectoIdProyecto = ?', [id])
    const proyecto = await sql.query('SELECT * FROM proyectos  WHERE idProyecto = ?', [id])
    res.render('proyectos/proyectoDetalle', {
        proyecto,
        detalle
    })
}

proyectocontrolador.eliminarProyecto = async (req, res) => {
    const id = req.params.id
    await orm.proyecto.destroy({
        where: {
            idProyecto: id
        }
    });
    await sql.query('DELETE FROM detalleproyectos WHERE ProyectoIdProyecto = ?', [id])
    req.flash('success', 'Se Elimino Correctamente');
    res.redirect('/proyecto/lista/' + id);
}

proyectocontrolador.MostarProyecto = async (req, res) => {
    const id = req.params.id
    const detalle = await sql.query('SELECT * FROM detalleproyectos WHERE ProyectoIdProyecto = ?', [id])
    const proyectos = await sql.query('select * from proyectos where idProyecto = ?', [id])
    res.render('proyectos/proyectoEditar', {
        proyectos,
        detalle
    })
}

proyectocontrolador.actualizarProyectos = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    const {
        NombreProyecto,
        DecripcionProyecto,
        fechaProyecto,
        Vision,
        Mision,
        objetivos,
        objetivos1,
        unico,
        numeros
    } = req.body

    await sql.query('UPDATE proyectos set NombreProyecto = ?, DecripcionProyecto = ?, fechaProyecto = ?, visionProyecto = ?, MisionProyecto = ? WHERE idProyecto = ?', [NombreProyecto, DecripcionProyecto, fechaProyecto, Vision, Mision, id])
    
    await sql.query('UPDATE detalleproyectos set objetivos = ? WHERE ProyectoIdProyecto = ?', [objetivos, parseInt(id)])
    if (parseInt(numeros) === 1) {
        await sql.query('INSERT INTO detalleproyectos(objetivos, ProyectoIdProyecto, usuarioIdUsuarios) VALUES (?,?,?)', [unico, id, ids])
    } else {
        if (parseInt(numeros) > 1) {
            for (let j = 0; j < objetivos1.length; j++) {
                await sql.query('INSERT INTO detalleproyectos(objetivos, ProyectoIdProyecto, usuarioIdUsuarios) VALUES (?,?,?)', [objetivos1[j], id, ids])
            }
        }
    }
    if (numeros === '') {
        console.log('No hay nuevos objetivos')
    }
    if (objetivos.length >= 2 && objetivos.length <= 10) {
        for (let i = 0; i < objetivos.length; i++) {
            await sql.query('UPDATE detalleproyectos set objetivos = ? WHERE ProyectoIdProyecto = ?', [objetivos[i], (parseInt(id) + i)])
        }
        if (parseInt(numeros) > 1) {
            for (let j = 0; j < objetivos1.length; j++) {
                await sql.query('INSERT INTO detalleproyectos(objetivos, ProyectoIdProyecto, usuarioIdUsuarios) VALUES (?,?,?)', [objetivos1[j], id, ids])
            }
        } else {
            if (numeros === '') {
                console.log('No hay nuevos objetivos')
            }
        }

    }
    req.flash('success', 'Se Actualizo Correctamente');
    res.redirect('/proyecto/Lista/detalle/' + id);
}

module.exports = proyectocontrolador