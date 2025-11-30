
const cloudinary = require('cloudinary').v2
// require('dotenv').config()


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET
// });


const configureCloudinary  = ({cloudName, apiKey, apiSecret}) => {
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    });
    return cloudinary;
}

module.exports = configureCloudinary


