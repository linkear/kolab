const clientes = (sequelize, type) =>{
    return sequelize.define('clientes', {
        idClientes:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreCliente: type.STRING,
        Cedula: type.INTEGER,
        username: type.STRING,
        password: type.STRING,
        creacionClientes:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionClientes:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = clientes