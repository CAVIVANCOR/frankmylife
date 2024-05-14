const {Router} = require("express");
const {getCategoriesHandler, createCategorieHandler, deleteCategorieHandler, updateCategorieHandler, searchCategorieHandler} = require("../../controllers/media/categoriesControllers.js");
const categoriesRouter = Router();

categoriesRouter.get("/", getCategoriesHandler);
categoriesRouter.post("/", createCategorieHandler);
categoriesRouter.delete("/:id", deleteCategorieHandler);
categoriesRouter.put("/:id", updateCategorieHandler);
categoriesRouter.post("/search/", searchCategorieHandler);

module.exports = categoriesRouter;

