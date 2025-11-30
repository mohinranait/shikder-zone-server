const StoreSetting = require("../models/StoreSettingModel")

const getSetting = async (req, res, next) => {
    try {
       
        let settings = await StoreSetting.findOne({})
        if(!settings){
            settings = await StoreSetting.create({})
        }
       
        return successResponse(res, {
            message: "Success",
            statusCode:200,
            payload: settings,
        })
    } catch (error) {
        console.error("Error fetching settings:", error)
        next(error)
    }
}


const updateSetting = async (req, res , next) => {
    try {

        const body = req.body;
        const settings = await StoreSetting.findOneAndUpdate(
            { },
            { ...body },
            { upsert: true, new: true },
        )

        return successResponse(res, {
            message: "Success",
            statusCode:200,
            payload: settings,
        })
    } catch (error) {
        console.error("Error saving settings:", error)
        next(error)
    }
}


module.exports = {
    getSetting,
    updateSetting
}