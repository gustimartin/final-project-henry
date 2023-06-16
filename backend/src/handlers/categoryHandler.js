const {getAllCategories, createCategory} = require('../controllers/categoryControllers')


const getCategoriesHandler = async(req, res) => {

    try{

    const categories = await getAllCategories()

    res.status(200).json(categories)

    }catch(error){

        res.status(400).json({error: error.message})
    }

}


const createCategoriesHandler = async(req, res) => {

const {name} = req.body

try{

    const category = await createCategory(name)

    res.status(200).json(category)

    }catch(error){

        res.status(400).json({error: error.message})
    }



}



module.exports = {
    getCategoriesHandler,
    createCategoriesHandler,
}