const { Router } = require('express');
const {getCategoriesHandler, createCategoriesHandler} = require('../handlers/categoryHandler')

const router = Router();



router.get('/', getCategoriesHandler)
router.post('/', createCategoriesHandler)






module.exports = router;