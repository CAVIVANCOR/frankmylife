const categoriesService = require("../../services/media/categorieService");
const { response, responseError,catchedAsync } = require("../../utils");
const getCategoriesHandler = async (req, res) => {
    let { isAdministrator } = req.query;
    isAdministrator = isAdministrator === "true";
    const results = await categoriesService.getAllCategories(isAdministrator);
    response(res, 201, results, "Categories");
};
const createCategorieHandler = async (req, res) => {
    const results = await categoriesService.createCategorie(req.body);
    response(res, 201, results, "Categories");
};
const updateCategorieHandler = async (req, res) => {
    const id = req.params.id;
    const results = await categoriesService.updateCategorie(id, req.body);
    response(res, 201, results, "Categories");
};
const deleteCategorieHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await categoriesService.deleteCategorie(id);
        response(res, 201, results, "Categories");
    } catch (error) {
        responseError(res, 500, error.message, "Categories");
    }
};
const searchCategorieHandler = async (req, res) => {
    const results = await categoriesService.searchCategorie(req.body);
    response(res, 201, results, "Categories");
}
module.exports = {
    getCategoriesHandler: catchedAsync(getCategoriesHandler),
    createCategorieHandler: catchedAsync(createCategorieHandler),
    updateCategorieHandler: catchedAsync(updateCategorieHandler),
    deleteCategorieHandler: catchedAsync(deleteCategorieHandler),
    searchCategorieHandler: catchedAsync(searchCategorieHandler)
}
