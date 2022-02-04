const detalleProyecto = (sequelize, type) => {
    return sequelize.define('detalleProyecto', {
        idDetalleProyecto: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        creacionDetalleProyectos:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionDetaalleProyectos:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = detalleProyecto