const proyectocontrolador = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql');

proyectocontrolador.Mostrar = async (req, res) => {
    const id = req.params.id
    const rol = await sql.query('select r.nombreRol from rols r join detallerols d on  d.RolIdRol = r.idRol WHERE d.usuarioIdUsuarios = ?', [id])
    const idProyecto = await sql.query('select max(idProyecto) from proyectos')
    res.render('proyectos/proyectoAgregar', { rol, idProyecto });
}

proyectocontrolador.Mandar = async (req, res) => {
    const ids = req.user.idUsuarios
    const kolab = 1
    const { numero, NombreProyecto, DecripcionProyecto, fechaProyecto, Vision, Mision, rol, objetivos } = req.body
    const nuevoEnvio = {
        NombreProyecto,
        DecripcionProyecto,
        fechaProyecto,
        visionProyecto: Vision,
        MisionProyecto: Mision,
        KolabIdKolab: kolab,
    }
    await orm.proyecto.create(nuevoEnvio)
    for (let i = 0; i < objetivos.length; i++) {
        await sql.query('INSERT INTO detalleproyectos(objetivos, ProyectoIdProyecto, usuarioIdUsuarios) VALUES (?,?,?)', [objetivos[i], numero, ids])
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
    res.render('proyectos/proyecto', { listaProyecto })
}

proyectocontrolador.ListaDetalle = async (req, res) => {
    const id = req.params.id
    const detalle = await sql.query('SELECT * FROM detalleproyectos WHERE ProyectoIdProyecto = ?', [id])
    const proyecto = await sql.query('SELECT * FROM proyectos  WHERE idProyecto = ?', [id])
    res.render('proyectos/proyectoDetalle', { proyecto, detalle })
}

proyectocontrolador.eliminarProyecto = async (req, res) => {
    const id = req.params.id
    await orm.proyecto.destroy({ where: { idProyecto: id } });
    req.flash('success', 'Se Elimino Correctamente');
    res.redirect('/proyecto/lista/' + id);
}

proyectocontrolador.MostarProyecto = async (req, res) => {
    const id = req.params.id
    const detalle = await sql.query('SELECT * FROM detalleproyectos WHERE ProyectoIdProyecto = ?', [id])
    const proyectos = await sql.query('select * from proyectos where idProyecto = ?', [id])
    res.render('proyectos/proyectoEditar', { proyectos, detalle })
}

proyectocontrolador.actualizarProyectos = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    const { NombreProyecto, DecripcionProyecto, fechaProyecto, Vision, Mision, objetivos } = req.body
    await sql.query('UPDATE proyectos set NombreProyecto = ?, DecripcionProyecto = ?, fechaProyecto = ?, visionProyecto = ?, MisionProyecto = ? WHERE idProyecto = ?', [NombreProyecto, DecripcionProyecto, fechaProyecto, Vision, Mision, id])
    for (let i = 0; i < objetivos.length; i++) {
        await sql.query('UPDATE detalleproyectos set objetivos = ? WHERE ProyectoIdProyecto = ?', [objetivos[i],  (parseInt(id)+i)])
    }
    req.flash('success', 'Se Actualizo Correctamente');
    res.redirect('/proyecto/Lista/detalle/' + id);
}

module.exports = proyectocontrolador