const usuarioService = require("../../services/usuarios/usuarioService");
const { response, catchedAsync } = require("../../utils");
const getUsuariosHandler = async (req,res)=>{
    let { isAdministrator } = req.query;
    isAdministrator = isAdministrator === 'true'; // Convierte el string a boolean
    const results = await usuarioService.getAllUsuarios(isAdministrator);
    response(res,201,results,"Usuario");
};
const createUsuarioHandler = async (req,res)=>{
    let registroUsuario = req.body;
    const results = await usuarioService.createUsuario(registroUsuario);
    response(res,201,results,"Usuario");
};
const deleteUsuarioHandler = async (req,res)=>{
    const id = req.params.id;
    const results = await usuarioService.deleteUsuario(id);
    response(res,201,results,"Usuario");
};
const updateUsuarioHandler = async (req,res)=>{
    const id = req.params.id;
    let registroUsuario = req.body;
    const results = await usuarioService.updateUsuario(id,registroUsuario);
    response(res,201,results,"Usuario");
};
const searchUsuarioHandler = async (req,res)=>{
    let registroUsuario = req.body;
    const results = await usuarioService.searchUsuario(registroUsuario);
    response(res,201,results,"Usuario");
};
const getMaxIdUsuarioHandler = async (req,res)=>{
    const results = await usuarioService.getMaxIdusuario();
    response(res,201,results,"Usuario");
}
module.exports ={
    getUsuariosHandler: catchedAsync(getUsuariosHandler),
    createUsuarioHandler: catchedAsync(createUsuarioHandler),
    deleteUsuarioHandler: catchedAsync(deleteUsuarioHandler),
    updateUsuarioHandler: catchedAsync(updateUsuarioHandler),
    searchUsuarioHandler: catchedAsync(searchUsuarioHandler),
    getMaxIdUsuarioHandler: catchedAsync(getMaxIdUsuarioHandler)}