const kolabcontrolador = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql');


kolabcontrolador.mostrar = (req, res) =>{
    res.render('kolab/kolabAgregar');
}

kolabcontrolador.mandar = async (req, res) =>{
    const ids = req.user.idUsuarios
    const {NombreKolab, mision, vision, objetivos} = req.body
    const nuevoEnvio={
        NombreKolab,
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
    const {NombreKolab, mision, vision, objetivos} = req.body
    const nuevoEnvio={
        NombreKolab,
        Mision: mision,
        Vision: vision,
        usuarioIdUsuarios: ids
    }

    await orm.kolab.findOne({ where: { idKolab: ids}})
    .then( actualizarEnvio => {
        actualizarEnvio.update(nuevoEnvio)
    })
    for(let i = 0; i< objetivos.length; i++){
        await sql.query('UPDATE detallekolabs(objetivos, KolabIdKolab) VALUES (?,?)',[objetivos[i], ids])
    }
    req.flash('success', 'Exito al Actualizar')
    res.redirect('/Kolab/lista/' + ids);
}

module.exports = kolabcontrolador