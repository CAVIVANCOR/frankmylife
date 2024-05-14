const {Router} = require("express");
const {getAccesosHandler, createAccesosHandler, deleteAccesoHandler, updateAccesoHandler, searchAccesoHandler} = require("../../controllers/usuarios/accesoController");
const accesosRouter = Router();

accesosRouter.get("/", getAccesosHandler);
accesosRouter.post("/", createAccesosHandler);
accesosRouter.delete("/:id", deleteAccesoHandler);
accesosRouter.put("/:id", updateAccesoHandler);
accesosRouter.post("/search", searchAccesoHandler);

module.exports = accesosRouter;
