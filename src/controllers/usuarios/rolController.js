const rolService = require("../../services/usuarios/rolService");
const { response, catchedAsync } = require("../../utils");
const getRolesHandler = async (req,res)=>{
    const results = await rolService.getAllRoles();
    response(res,201,results,"Rol");
};
const createRolHandler = async (req,res)=>{
    let registroRol = req.body;
    const results = await rolService.createRol(registroRol);
    response(res,201,results,"Rol");
};
const deleteRolHandler = async (req,res)=>{
    const id = req.params.id;
    const results = await rolService.deleteRol(id);
    response(res,201,results,"Rol");
};
const updateRolHandler = async (req,res)=>{
    const id = req.params.id;
    let registroRol = req.body;
    const results = await rolService.updateRol(id,registroRol);
    response(res,201,results,"Rol");
};
const searchRolHandler = async (req,res)=>{
    let registroRol = req.body;
    const results = await rolService.searchRol(registroRol);
    response(res,201,results,"Rol");
};
module.exports ={
    getRolesHandler: catchedAsync(getRolesHandler),
    createRolHandler: catchedAsync(createRolHandler),
    deleteRolHandler: catchedAsync(deleteRolHandler),
    updateRolHandler: catchedAsync(updateRolHandler),
    searchRolHandler: catchedAsync(searchRolHandler)}