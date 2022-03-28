const kolabcontrolador = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql');


kolabcontrolador.mostrar = async(req, res) =>{
    const traer = await sql.query('select * from kolabs')
    res.render('kolab/kolabAgregar', {traer});
}

kolabcontrolador.siguiente = async(req, res) =>{
    const id = req.user.idUsuarios
    const listaKolab = await sql.query('select * from listaKolab')
    if(listaKolab.length === 0){
        const lista = listaKolab[0]
        if(lista === undefined){
            await sql.query('CREATE VIEW listaKolab AS SELECT p.*, d.idDoers,d.Cedula,d.NombreDoers,d.Edad,d.Telefono,d.DescripcionDoers, c.* FROM proyectos p JOIN doers d ON d.ProyectoIdProyecto = p.idProyecto JOIN comunidades c ON c.ProyectoIdProyecto = p.idProyecto WHERE p.KolabIdKolab = ?',[id])
            console.log('guardado')
        }
    }else{
        console.log('ya existe')
    }
    es.redirect('/Kolab/lista/' + id)
}

kolabcontrolador.mandar = async (req, res) =>{
    const ids = req.user.idUsuarios
    const {NombreKolab, Descripcion, mision, vision, objetivos} = req.body
    const nuevoEnvio={
        NombreKolab,
        Descripcion,
        Mision: mision,
        Vision: vision,
        usuarioIdUsuarios: ids
    }

    await orm.kolab.create(nuevoEnvio)
    for(let i = 0; i< objetivos.length; i++){
        await sql.query('INSERT INTO detallekolabs(objetivos,KolabIdKolab) VALUES (?,?)',[objetivos[i], ids])
    }
    req.flash('success', 'Exito al Guardar')
    res.redirect('/Kolab/lista/' + ids);
}

kolabcontrolador.Lista = async(req, res) =>{
    const ids = req.user.idUsuarios 
    const kolab = await sql.query('SELECT * FROM kolabs WHERE usuarioIdUsuarios = ?',[ids])
    const detalle = await sql.query('SELECT * FROM detallekolabs WHERE KolabIdKolab = ?', [ids])
    res.render('Kolab/kolab', {kolab, detalle})
}

kolabcontrolador.mostrarEdicion = async(req, res) =>{
    const ids = req.params.id
    const kolab = await sql.query('SELECT * FROM kolabs WHERE usuarioIdUsuarios = ?',[ids])
    const detalle = await sql.query('SELECT objetivos FROM detallekolabs WHERE KolabIdKolab = ?', [ids])
    res.render('Kolab/kolabEditar', {kolab, detalle})
}

kolabcontrolador.actualizar = async(req, res) =>{
    const ids = req.params.id
    const id = req.user.idUsuarios
    const {NombreKolab, Descripcion, mision, vision, objetivos} = req.body
    const nuevoEnvio={
        NombreKolab,
        Descripcion,
        Mision: mision,
        Vision: vision
    }

    await orm.kolab.findOne({ where: { idKolab: ids}})
    .then( actualizarEnvio => {
        actualizarEnvio.update(nuevoEnvio)
    })
    for(let i = 0; i< objetivos.length; i++){
        await sql.query('UPDATE detallekolabs set objetivos = ?, KolabIdKolab = ? where idDetalleKolab = ?',[objetivos[i], id, ids])
    }
    req.flash('success', 'Exito al Actualizar')
    res.redirect('/Kolab/lista/' + ids);
}

module.exports = kolabcontrolador