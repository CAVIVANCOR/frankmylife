const {Sequelize} = require('sequelize');
require('dotenv').config();
const {DB_USER, DB_PASSWORD, DB_HOST, SERVER_PORT} = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/frankmylife`, {
    logging: false,
    dialectOptions: {
        requestTimeout: 30000,
        decimalNumbers: true},
    parse: {
        timezone: 'America/Lima'
    }
});

const AccesoModel = require('./models/usuarios/Acceso');
const RolModel = require('./models/usuarios/Rol');
const UsuarioModel = require('./models/usuarios/Usuario');
const MediaModel = require('./models/media/Media');
const CategoriesModel = require('./models/media/Categories');

UsuarioModel(sequelize);
RolModel(sequelize);
AccesoModel(sequelize);
MediaModel(sequelize);
CategoriesModel(sequelize);

const {Acceso, Rol, Usuario, Media, Categories} = sequelize.models;

Rol.hasMany(Usuario);
Usuario.belongsTo(Rol);

Usuario.hasMany(Acceso);
Acceso.belongsTo(Usuario);

Usuario.hasMany(Media);
Media.belongsTo(Usuario);

Categories.hasMany(Media);
Media.belongsTo(Categories);

module.exports={sequelize, SERVER_PORT, ...sequelize.models};
