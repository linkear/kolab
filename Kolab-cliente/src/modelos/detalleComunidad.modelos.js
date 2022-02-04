const detalleComunidad = (sequelize, type) =>{
    return sequelize.define('DetalleComunidad', {
        idDetalleComunidad: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        participantes: type.STRING,
        creacionDetalleComunidad:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionDetalleComunidad:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = detalleComunidad