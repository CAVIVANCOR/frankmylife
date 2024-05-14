const {Usuario, Rol, Media} = require("../../db");
const { Op } = require("sequelize");
const regUsuarioUsuario ={
    where: { borradoLogico: false },
    include:[
    {
        model:Rol,
        attributes:["descripcion","superUsuario"]
    }],
};
const {where,...regUsuarioAdmin}=regUsuarioUsuario;

const getAllUsuarios= async (isAdministrator)=>{
    let regUsuario = regUsuarioUsuario;
    if (isAdministrator) regUsuario = regUsuarioAdmin;
    databaseUsuarios = await Usuario.findAll(regUsuario);
    return databaseUsuarios;
};
const getMaxIdusuario = async ()=>{
    return await Usuario.max('id');
}
const createUsuario = async (regUsuario)=>{
    const transactionCrearUsuario = await Usuario.sequelize.transaction();
    try {
        //await Usuario.sequelize.query('Lock Table Usuario',{transaction:transactionCrearUsuario});
        let maxIdUsuario = await Usuario.max('id');
        let newUsuario = await Usuario.create({id:maxIdUsuario+1, ...regUsuario},{transaction:transactionCrearUsuario});
        await transactionCrearUsuario.commit();
        console.log('Registro creado OK Tabla Usuario')
        return newUsuario;
    } catch (error) {
        await transactionCrearUsuario.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteUsuario = async (id)=>{
    let transactionEliminarUsuario = await Usuario.sequelize.transaction();
    try {
        let foundUsuario = await Usuario.findByPk(id);
        if (!foundUsuario) throw new Error('ID de Usuario no encontrado');
        let foundMedia = await Media.findAll({where:{UsuarioId:id,borradoLogico:false}});
        if (foundMedia.length>0) throw new Error('No se puede eliminar el usuario porque tiene Medias asociadas');
        let deletedUsuario = await foundUsuario.update({borradoLogico:!foundUsuario.borradoLogico},{transaction:transactionEliminarUsuario});
        await transactionEliminarUsuario.commit();
        console.log('Registro eliminado OK Tabla Usuario');
        return deletedUsuario;
    } catch (error) {
        await transactionEliminarUsuario.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateUsuario = async (id,regUsuario)=>{
    let transactionActualizarUsuario = await Usuario.sequelize.transaction();
    try {
        let foundUsuario = await Usuario.findByPk(id);
        if (!foundUsuario) throw new Error('ID de Usuario no encontrado');
        let updatedUsuario = await foundUsuario.update(regUsuario,{transaction:transactionActualizarUsuario});
        await transactionActualizarUsuario.commit();
        console.log('Registro actualizado OK Tabla Usuario');
        return updatedUsuario;
    } catch (error) {
        await transactionActualizarUsuario.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchUsuario = async (search)=>{
    try {
       // console.log("search", search);
        let buscar = {};
        if (search.email !== undefined) {
            buscar['$Personal.email$'] = { [Op.like]: `%${search.email}%` };
            delete search.email;
        };
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
       // console.log("buscar", buscar);
        let foundUsuario = await Usuario.findAll({
            where: buscar,
            include:[
            {
                model:Rol,
                attributes:["descripcion","superUsuario"],
                required:true
            },
        ],
          });
        console.log("searchUsuario:Registros encontrados en Tabla Usuario", foundUsuario.length);
        return foundUsuario;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllUsuarios,createUsuario,deleteUsuario, updateUsuario, searchUsuario, getMaxIdusuario};