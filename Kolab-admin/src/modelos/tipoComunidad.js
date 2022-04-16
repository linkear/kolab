const tipoComunidad = (sequelize, type) => {
    return sequelize.define('TipoComunidades', {
        idTipoComunidad: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipoComunidades: type.STRING,
        creacionTipoComunidad: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionTipoComunidad: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = tipoComunidad