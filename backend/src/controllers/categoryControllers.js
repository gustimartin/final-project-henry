
const Category = require('../models/Category')

const createCategory = async (name) => {
    const newCategory = new Category({
        name
    })
    return await newCategory.save()
}

const getAllCategories = async () => {
    const allCategory = await Category.find()
    return allCategory
}

module.exports = {
    createCategory,
    getAllCategories,

}