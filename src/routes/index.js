const {Router} = require("express");
const mainRouter = Router();

const accesosRouter = require("./usuarios/accesosRouter");
const rolesRouter = require("./usuarios/rolesRouter");
const usuariosRouter = require("./usuarios/usuariosRouter");
const mediasRouter = require("./media/mediasRouter");
const categoriesRouter = require("./media/categoriesRouter")

mainRouter.use("/accesos", accesosRouter);
mainRouter.use("/roles", rolesRouter);
mainRouter.use("/usuarios", usuariosRouter);
mainRouter.use("/medias", mediasRouter);
mainRouter.use("/categories", categoriesRouter);

module.exports = mainRouter;
