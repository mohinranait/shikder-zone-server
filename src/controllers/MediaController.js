const mongoose = require('mongoose');
const createError = require('http-errors');
const { successResponse } = require('../utils/responseHandler');
const cloudinary = require('../config/cloudinary');
const Media = require('../models/MediaModel');
const configureCloudinary = require('../config/cloudinary');
const { AppIntegration } = require('../models/AppServiceModel');


// Update profile by ID
const uploadImage = async (req, res, next) => {
    try {

        const image = req.file?.path;
        const fileType = req?.body?.fileType;

        // Get cloudinary config from DB
         let integrations = await AppIntegration.findOne({});
        if (!integrations) {
            integrations = await AppIntegration.create({});
        }

        const cloudinary  = configureCloudinary({
            cloudName: integrations?.cloudinary?.cloudName,
            apiKey: integrations?.cloudinary?.apiKey,
            apiSecret: integrations?.cloudinary?.apiSecret,
        }) 

        // Checked if cloudinary integration is active
        if(integrations?.cloudinary?.isActive !== true){
            throw createError(503, "Cloudinary integration is not active")
        }

        // upload profile image and Store in Shikder-Zone folder
        const imageRes = await cloudinary.uploader.upload(image, {
            folder: 'shikder-zone',
        })

        const { url, format, width, height, bytes } = imageRes;


        const file = await Media.create({
            fileType: fileType,
            fileUrl: url,
            width,
            height,
            extension: format,
            size: bytes,
        })



        return successResponse(res, {
            statusCode: 201,
            message: "Image uploaded",
            payload: {
                file
            }
        })

    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error) {
            return next(createError(400, "Invalid user ID"))
        }
        next(error)
    }
}

const getAllMedias = async (req, res,next) => {
    try {
        const userId = req?.user?.id;
        if(!userId) return;

        const medias = await Media.find({});
        return successResponse(res, {
            statusCode:200,
            payload:{
                medias
            }
            
        })
    } catch (error) {
        next(error)
    }
}


/**
 * Delete media by ID
*/
const deleteMediaById = async (req, res, next) => {
    try {
        const authUser = req?.user
        if(!authUser) throw createError(401, "Unauthorized access")
        if(authUser?.role !== 'Admin' && authUser?.role !== "Manager") throw createError(403, "Forbidden access")
        
        const id = req.params?.mediaId;
        if (!id) throw createError(404, "Media is required")
       
        const media = await Media.findByIdAndDelete(id);
        if (!media) throw createError(404, "Media not found")

        return successResponse(res, {
            statusCode:200,
            message:"Media deleted successfully",
            payload:{
                media
            }
        })

       
    } catch (error) {
        console.error('Error deleting media:', error);
       next(error)
    }
}

module.exports = {
    uploadImage,
    getAllMedias,
    deleteMediaById,
}