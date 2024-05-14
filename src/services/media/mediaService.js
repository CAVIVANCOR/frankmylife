const {Media, Usuario, Categories} = require("../../db");
const { Op } = require("sequelize");
const regMediaUsuario ={
    where: { borradoLogico: false },
    include:[{
                model:Usuario,
                attributes:["usuario","password","nombres","email","urlFoto"]
            },
            {
                model:Categories,
                attributes:["id","descripcion"]
            }]
};
const {where,...regMediaAdmin}=regMediaUsuario;

const getAllMedia= async (isAdministrator=false)=>{
    let databaseMedia = null;
    let regMedia = regMediaUsuario;
    if (isAdministrator) regMedia = regMediaAdmin;
    databaseMedia = await Media.findAll(regMedia);
    return databaseMedia;
};

const getMaxIdMedia = async ()=>{
    return await Media.max('id');
}

const createMedia = async (regMedia)=>{
    console.log("regMedia",regMedia);
    const transactionCrearMedia = await Media.sequelize.transaction();
    try {
        // await Media.sequelize.query('Lock Table Media',{transaction:transactionCrearMedia});
        let maxIdMedia = await Media.max('id');
        let newMedia = await Media.create({id:maxIdMedia+1, ...regMedia}, {transaction:transactionCrearMedia});
        await transactionCrearMedia.commit();
        return newMedia;
    } catch (error) {
        await transactionCrearMedia.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

const deleteMedia = async (id)=>{
    let transactionEliminarMedia = await Media.sequelize.transaction();
    try {
        let foundMedia = await Media.findByPk(id);
        if (!foundMedia) throw new Error('ID de Media no encontrado');
        let deletedMedia = await foundMedia.update({borradoLogico:!foundMedia.borradoLogico},{transaction:transactionEliminarMedia});
        await transactionEliminarMedia.commit();
        console.log('Registro eliminado OK Tabla Media');
        return deletedMedia;
    } catch (error) {
        await transactionEliminarMedia.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateMedia = async (id,regMedia)=>{
    let transactionActualizarMedia = await Media.sequelize.transaction();
    try {
        let foundMedia = await Media.findByPk(id);
        if (!foundMedia) throw new Error('ID de Media no encontrado');
        let updatedMedia = await foundMedia.update(regMedia, {transaction:transactionActualizarMedia});
        await transactionActualizarMedia.commit();
        console.log('Registro actualizado OK Tabla Media');
        return updatedMedia;
    } catch (error) {
        await transactionActualizarMedia.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchByMedia= async (search)=>{
    try {
        let buscar = {};
        buscar.borradoLogico = false;
        if (search.fecha !== undefined) {
            buscar.fecha = { [Op.eq]: search.fecha };
            delete search.fecha;
        };
        if (search.fechaInicial !== undefined && search.fechaFinal !== undefined) {
            buscar.fecha = { [Op.between]: [search.fechaInicial, search.fechaFinal] };
            delete search.fechaInicial;
            delete search.fechaFinal;
        } else if (search.fechaInicial !== undefined) {
            buscar.fecha = { [Op.gte]: search.fechaInicial };
            delete search.fechaInicial;
        } else if (search.fechaFinal !== undefined) {
            buscar.fecha = { [Op.lte]: search.fechaFinal };
            delete search.fechaFinal;
        };
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value.toUpperCase()}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsMedia = await Media.findAll({
            where: buscar,
            include: [{
                        model: Usuario,
                        attributes:["usuario","password","nombres","email","urlFoto"],
                        required: true
                    },
                    {
                        model: Categories,
                        attributes:["id","descripcion"],
                        required: true
                    }]
        });
        console.log("searchByMedia:Registros encontrados en Tabla Media", foundRegsMedia.length);
        return foundRegsMedia;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
        
    }
};


module.exports = {getAllMedia,createMedia,deleteMedia, updateMedia, searchByMedia, getMaxIdMedia};