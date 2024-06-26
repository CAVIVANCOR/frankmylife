const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Rol",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        superUsuario:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        created:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        borradoLogico:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
    },
    {
        timestamps:false,
        tableName: "Rol"
    }
    )
}

// rol:{
//     type:DataTypes.ENUM("SELLER","ADMIN","MANAGER","WAREHOUSE","ACCOUNTANT"),
//     defaultValue:"SELLER",
// },