const {Router}=require("express");
const {getUsuariosHandler,createUsuarioHandler, deleteUsuarioHandler, updateUsuarioHandler, searchUsuarioHandler, getMaxIdUsuarioHandler} = require("../../controllers/usuarios/usuarioController");
const usuariosRouter = Router();

usuariosRouter.get("/",getUsuariosHandler);
usuariosRouter.post("/",createUsuarioHandler);
usuariosRouter.delete("/:id",deleteUsuarioHandler);
usuariosRouter.put("/:id",updateUsuarioHandler);
usuariosRouter.post("/search/",searchUsuarioHandler);
usuariosRouter.get("/maxId",getMaxIdUsuarioHandler);

module.exports = usuariosRouter;