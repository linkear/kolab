const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const dbName = process.env.DB_SCHEMAS || "Kolab";

mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user     : process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "",
}).then( connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
        console.info("Base de datos creada o comprobada correctamente");
    })
})

const usuarioModelo = require('../modelos/usuario.modelos')
const proyectoModelo = require('../modelos/proyectos.modelos')
const Kolabmodelo = require('../modelos/kolab.modelo')
const doersModelos = require('../modelos/doers.modelos')
const detalleProyectoModelo = require('../modelos/detalleProyecto.modelo')
const detalleKolabModelo = require('../modelos/detalleKolab.modelo')
const detalleComunidadModelo = require('../modelos/detalleComunidad.modelos')
const cominidadModelo = require('../modelos/comunidad.modelo')
const clienteModelo = require('../modelos/clientes.modelos')
const capitalizacionModelo = require('../modelos/capitalizacion.modelo')
const rolModelo = require('../modelos/rol.modelo')
const detalleRolmodelo = require('../modelos/detalleRol.modelo');
const contadorModelo = require('../modelos/contador.modelo')


const sequelize = new Sequelize(
  'Kolab',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  }
)

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })

sequelize.sync({ force: false })
  .then(() => {
    console.log("Tablas sincronizadas")
  })

const usuario = usuarioModelo(sequelize, Sequelize)
const proyecto = proyectoModelo(sequelize, Sequelize)
const kolab = Kolabmodelo(sequelize, Sequelize)
const doers = doersModelos(sequelize, Sequelize)
const detalleProyecto = detalleProyectoModelo(sequelize, Sequelize)
const detalleKolab = detalleKolabModelo(sequelize, Sequelize)
const detalleComunidad = detalleComunidadModelo(sequelize, Sequelize)
const comunidad = cominidadModelo(sequelize, Sequelize)
const clientes = clienteModelo(sequelize, Sequelize)
const capitalizacion = capitalizacionModelo(sequelize, Sequelize)  
const rol = rolModelo(sequelize, Sequelize)
const detalleRol = detalleRolmodelo(sequelize, Sequelize)
const contador = contadorModelo(sequelize, Sequelize)

//Relaciones 
usuario.hasMany(kolab)
kolab.belongsTo(usuario)

kolab.hasMany(doers)
doers.belongsTo(kolab)

proyecto.hasMany(doers)
doers.belongsTo(proyecto)

usuario.hasMany(doers)
doers.belongsTo(usuario)

kolab.hasMany(proyecto)
proyecto.belongsTo(kolab)

usuario.hasMany(proyecto)
proyecto.belongsTo(usuario)

proyecto.hasMany(comunidad)
comunidad.belongsTo(proyecto)

proyecto.hasMany(detalleProyecto)
detalleProyecto.belongsTo(proyecto)

usuario.hasMany(detalleProyecto)
detalleProyecto.belongsTo(usuario)

comunidad.hasMany(detalleComunidad)
detalleComunidad.belongsTo(comunidad)

kolab.hasMany(detalleKolab)
detalleKolab.belongsTo(kolab)

usuario.hasMany(detalleRol)
detalleRol.belongsTo(usuario)

rol.hasMany(detalleRol)
detalleRol.belongsTo(rol)

module.exports = {
  usuario,
  proyecto,
  kolab,
  doers,
  detalleProyecto,
  detalleKolab,
  comunidad,
  detalleComunidad,
  clientes,
  capitalizacion, 
  rol,
  detalleRol,
  contador
}