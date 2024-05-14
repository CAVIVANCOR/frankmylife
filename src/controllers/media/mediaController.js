const mediaService = require('../../services/media/mediaService');
const {response, catchedAsync} = require('../../utils/');

const getMediasHandler = async (req,res)=>{
    let {isAdministrator} = req.query;
    isAdministrator = isAdministrator === 'true';
    const results = await mediaService.getAllMedia(isAdministrator);
    response(res,201,results,"Media");
};

const createMediaHandler = async (req,res)=>{
    const results = await mediaService.createMedia(req.body);
    response(res,201,results,"Media");
};

const deleteMediaHandler = async (req,res)=>{
    const id = req.params.id;
    const results = await mediaService.deleteMedia(id);
    response(res,201,results,"Media");
};

const updateMediaHandler = async (req,res)=>{
    const id = req.params.id;
    const results = await mediaService.updateMedia(id,req.body);
    response(res,201,results,"Media");
};

const searchMediaHandler = async (req,res)=>{
    const results = await mediaService.searchByMedia(req.body);
    response(res,201,results,"Media");
}

const getMaxIdMediaHandler = async (req,res)=>{
    const results = await mediaService.getMaxIdMedia();
    response(res,201,results,"Media");
}

module.exports = {
    getMediasHandler: catchedAsync(getMediasHandler),
    createMediaHandler: catchedAsync(createMediaHandler),
    deleteMediaHandler: catchedAsync(deleteMediaHandler),
    updateMediaHandler: catchedAsync(updateMediaHandler),
    searchMediaHandler: catchedAsync(searchMediaHandler),
    getMaxIdMediaHandler: catchedAsync(getMaxIdMediaHandler)
};

