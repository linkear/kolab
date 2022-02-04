const proyectos = (sequelize, type)=>{
    return sequelize.define('Proyectos',{
        idProyecto: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreProyecto: type.STRING,
        DecripcionProyecto: type.STRING(1500),
        fechaProyecto: type.STRING,
        visionProyecto: type.STRING(1500),
        MisionProyecto: type.STRING(1500),
        creacionProyeto:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionProyecto:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = proyectos