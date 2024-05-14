const {Router} = require("express");
const {getMediasHandler, createMediaHandler, deleteMediaHandler, updateMediaHandler, searchMediaHandler, getMaxIdMediaHandler} = require("../../controllers/media/mediaController");
const mediasRouter = Router();

mediasRouter.get("/", getMediasHandler);
mediasRouter.post("/", createMediaHandler);
mediasRouter.delete("/:id", deleteMediaHandler);
mediasRouter.put("/:id", updateMediaHandler);
mediasRouter.post("/search/", searchMediaHandler);
mediasRouter.get("/maxId", getMaxIdMediaHandler);

module.exports = mediasRouter;