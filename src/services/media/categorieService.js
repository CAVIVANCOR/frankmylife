const {Categories, Media} = require("../../db");
const { Op } = require("sequelize");
const regCategorieMedia ={
    where: { borradoLogico: false },
};
const {where,...regCategorieMediaAdmin}=regCategorieMedia;

const getAllCategories= async (isAdministrator=false)=>{
    let databaseCategories = null;
    let regCategorie = regCategorieMedia;
    if (isAdministrator) regCategorie = regCategorieMediaAdmin;
    databaseCategories = await Categories.findAll(regCategorie);
    return databaseCategories;
};
const createCategorie = async (regCategorie)=>{
    const transactionCrearCategorie = await Categories.sequelize.transaction();
    try {
        let newCategorie = await Categories.create(regCategorie,{transaction:transactionCrearCategorie});
        await transactionCrearCategorie.commit();
        console.log('Registro creado OK Tabla Categories')
        return newCategorie;
    } catch (error) {
        await transactionCrearCategorie.rollback();
        console.log(error.message);
        throw error;
    };
};

const deleteCategorie = async (id)=>{
    let transactionEliminarCategorie;
    try {
        transactionEliminarCategorie = await Categories.sequelize.transaction();
        let foundCategorie = await Categories.findByPk(id);
        if (!foundCategorie) throw new Error('ID de Categoria no encontrado');
        let foundMedia = await Media.findAll({where:{CategoryId:id,borradoLogico:false}});
        if (foundMedia.length>0) throw new Error('No se puede eliminar la categoria porque tiene Medias asociadas');
        let deletedCategorie = await foundCategorie.update({borradoLogico:!foundCategorie.borradoLogico},{transaction:transactionEliminarCategorie});
        await transactionEliminarCategorie.commit();
        console.log('Registro eliminado OK Tabla Categories');
        return deletedCategorie;
    } catch (error) {
        await transactionEliminarCategorie.rollback();
        console.log(error.message);
        throw error;
    };
};

const updateCategorie = async (id,regCategorie)=>{
    let transactionActualizarCategorie = await Categories.sequelize.transaction();
    try {
        let foundCategorie = await Categories.findByPk(id);
        if (!foundCategorie) throw new Error('ID de Categoria no encontrado');
        let updatedCategorie = await foundCategorie.update(regCategorie,{transaction:transactionActualizarCategorie});
        await transactionActualizarCategorie.commit();
        console.log('Registro actualizado OK Tabla Categories');
        return updatedCategorie;
    } catch (error) {
        await transactionActualizarCategorie.rollback();
        console.log(error.message);
        throw error;
    };
};

const searchCategorie = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundCategorie = await Categories.findAll({
            where: buscar
          });
        console.log("searchCategorie:Registros encontrados en Tabla Categories", foundCategorie.length);
        return foundCategorie;
    } catch (error) {
        console.log(error.message);
        throw error;
    };
};

module.exports = {
    getAllCategories,
    createCategorie,
    deleteCategorie,
    updateCategorie,
    searchCategorie
};