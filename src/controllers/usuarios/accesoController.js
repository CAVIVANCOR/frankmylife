const accesoService = require("../../services/usuarios/accesoService");
const { response, catchedAsync } = require("../../utils/");
const getAccesosHandler = async (req,res)=>{
    let {isAdministrator} = req.query;
    isAdministrator = isAdministrator === 'true';
    const results = await accesoService.getAllAccesos(isAdministrator);
    response(res, 200, results,"Acceso");
};
const createAccesosHandler = async (req,res)=>{
    let registroAcceso = req.body;
    let results = await accesoService.createAccesos(registroAcceso);
    response(res, 200, results,"Acceso");
};
const deleteAccesoHandler = async (req,res)=>{
    const id = req.params.id;
    const results = await accesoService.deleteAcceso(id);
    response(res, 200, results,"Acceso");
};
const updateAccesoHandler = async (req,res)=>{
    const id = req.params.id;
    let registroAcceso = req.body;
    const results = await accesoService.updateAcceso(id,registroAcceso);
    response(res, 200, results,"Acceso");
};
const searchAccesoHandler = async (req,res)=>{
    let registroAcceso = req.body;
    console.log("searchAccesoHandler",registroAcceso);
    const results = await accesoService.searchAcceso(registroAcceso);
    response(res, 200, results,"Acceso");
};
module.exports ={
    getAccesosHandler: catchedAsync(getAccesosHandler),
    createAccesosHandler: catchedAsync(createAccesosHandler),
    deleteAccesoHandler: catchedAsync(deleteAccesoHandler),
    updateAccesoHandler: catchedAsync(updateAccesoHandler),
    searchAccesoHandler: catchedAsync(searchAccesoHandler)}