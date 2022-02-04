const detalleKolab = (sequelize, type) => {
    return sequelize.define("detalleKolabs", {
        idDetalleKolab: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        objetivos: type.STRING(1500),
        creacionDetalleKolab:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionDetalleKolab:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = detalleKolab