const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Categories', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion:{
            type: DataTypes.STRING
        },
        borradoLogico:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
        tableName: 'Categories'
    }
);
};