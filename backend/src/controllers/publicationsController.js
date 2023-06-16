const Publications = require('../models/Publications')


const createPublications =  async (description, score) => {
    const newPublications = new Publications({
     
        description,
        score
       
    })

    return await newPublications.save()
}

const getAllPublications = async () => {
    const allPublications= await Publications.find()
    return allPublications
}

module.exports = {
    createPublications,
    getAllPublications
}