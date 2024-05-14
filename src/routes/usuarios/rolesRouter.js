const {Router}=require("express");
const {getRolesHandler,createRolHandler, deleteRolHandler, updateRolHandler, searchRolHandler} = require("../../controllers/usuarios/rolController");
const rolesRouter = Router();

rolesRouter.get("/",getRolesHandler);
rolesRouter.post("/",createRolHandler);
rolesRouter.delete("/:id",deleteRolHandler);
rolesRouter.put("/:id",updateRolHandler);
rolesRouter.post("/search/",searchRolHandler);

module.exports = rolesRouter;