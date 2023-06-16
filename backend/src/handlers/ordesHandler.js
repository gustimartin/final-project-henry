const Ordes = require('../models/Order')

const getOrdes = async (req, res) => {
    try {
        const allOrdes = await Ordes.find().sort({createdAt: -1}).exec()
        res.status(200).json(allOrdes)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}


module.exports = {
    getOrdes
}