const doers = (sequelize, type) =>{
    return sequelize.define('Doers', {
        idDoers: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreDoers: type.STRING,
        Edad: type.INTEGER,
        DescripcionDoers: type.STRING(1500),
        creacionDoers:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionDoers:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = doers