const cloudinary = require('cloudinary').v2

// * Configuracion
cloudinary.config({
    cloud_name: 'proyect1',
    api_key: '951874597583875',
    api_secret: 'hoBceweCR6gjWy5KJB8lJ6RXaIc',
    secure: true
})



  

// !--------------------------------
const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'products'
        });
        return result.secure_url;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    uploadImage
};