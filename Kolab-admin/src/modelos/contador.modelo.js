const contador = (sequileze, type) =>{
    return sequileze.define('contadors',{
        idContador: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        contador: type.STRING,
        creacionContador:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionContador:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = contador