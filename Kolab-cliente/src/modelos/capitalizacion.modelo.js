const capitalizacion = (sequelize, type) => {
    return sequelize.define('Capitalizaciones', {
        idCapitalizacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreCapitalizador: type.STRING,
        descripcionCapitalizador: type.STRING(1500),
        FotoCapitalizador: type.STRING,
        creacionCapitalizador:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionCapitalizador:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = capitalizacion