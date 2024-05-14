const {DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Media', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            get() {
                const value = this.getDataValue('id');
                return value === null ? value : Number(value);
            }
        },
        fecha:{
            type:DataTypes.DATEONLY,
            defaultValue:DataTypes.NOW,
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        url: {
            type: DataTypes.STRING
        },
        mediaType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        borradoLogico:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
    },
    {
        timestamps: false,
        tableName: 'Media'
    })
}
