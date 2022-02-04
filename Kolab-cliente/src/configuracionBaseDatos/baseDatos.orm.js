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
const doresModelos = require('../modelos/doers.modelos')
const detalleProyectoModelo = require('../modelos/detalleProyecto.modelo')
const detalleKolabModelo = require('../modelos/detalleKolab.modelo')
const detalleComunidadModelo = require('../modelos/detalleComunidad.modelos')
const cominidadModelo = require('../modelos/comunidad.modelo')
const clienteModelo = require('../modelos/clientes.modelos')
const capitalizacionModelo = require('../modelos/capitalizacion.modelo')

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

const usuario = usuarioModelo(Sequelize, sequelize)
const proyecto = proyectoModelo(Sequelize, sequelize)
const kolab = Kolabmodelo(Sequelize, sequelize)
const dores = doresModelos(Sequelize, sequelize)
const detalleProyecto = detalleProyectoModelo(Sequelize, sequelize)
const detalleKolab = detalleKolabModelo(Sequelize, sequelize)
const detalleComunidad = detalleComunidadModelo(Sequelize, sequelize)
const comunidad = cominidadModelo(Sequelize, sequelize)
const clientes = clienteModelo(Sequelize, sequelize)
const capitalizacion = capitalizacionModelo(Sequelize, sequelize)  

//Relaciones 
usuario.hasMany(kolab)
kolab.belongsTo(usuario)

kolab.hasMany(dores)
dores.belongsTo(kolab)

proyecto.hasMany(comunidad)
comunidad.belongsTo(proyecto)

proyecto.hasMany(detalleProyecto)
detalleProyecto.belongsTo(proyecto)

comunidad.hasMany(detalleComunidad)
detalleComunidad.belongsTo(comunidad)

kolab.hasMany(detalleKolab)
detalleKolab.belongsTo(kolab)

module.exports = {
  usuario,
  proyecto,
  kolab,
  dores,
  detalleProyecto,
  detalleKolab,
  detalleComunidad,
  clientes,
  capitalizacion
}