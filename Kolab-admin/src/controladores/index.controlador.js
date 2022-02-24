const indexControlador = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm');
const sql = require('../configuracionBaseDatos/baseDatos.sql')

indexControlador.mostrar=(req, res)=>{
    res.render('index');
}

indexControlador.Verificar = async(req, res)=>{
    const rol = await sql.query('select * from rols')
    if(rol.length == 0){
        const roles = rol[0]
        if(roles === undefined){
            await sql.query('insert into rols(idRol, nombreRol) values (1, "administrador")')
            await sql.query('insert into rols(idRol, nombreRol) values (2, "doers")')
            console.log('guardado')
        }else{
            console.log('ya existe')
        }
    }
    const {username} = req.body
    const verificacion = await orm.usuario.findOne({ where: { username: username }})
    if( verificacion){
        const usuario = verificacion
        if(usuario.password === null){
            res.redirect('/actualizacion/Datos/' + usuario.idUsuarios)
        }else{
            if(usuario.username === null){
                res.redirect('/Registro')
            }else{
                res.redirect('/Login/'+ usuario.idUsuarios)
            }
        }
    }else{
        res.redirect('/Registro')
    }
}

module.exports = indexControlador