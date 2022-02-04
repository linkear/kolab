const Kolab = (sequelize, type) =>{
    return sequelize.define('Kolabs', {
        idKolab: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreKolab: type.STRING,
        Mision: type.STRING(1500),
        Vision: type.STRING(1500),
        creacionKolab:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionKolab:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = Kolab