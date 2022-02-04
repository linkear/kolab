const comunidad = (sequelize, type) =>{
    return sequelize.define('comunidades', {
        idComunidad: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreComunidad: type.STRING,
        DescripcionComunidad: type.STRING,
        FechaComunidad: type.STRING,
        creacionComunidad:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionComunidad:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = comunidad