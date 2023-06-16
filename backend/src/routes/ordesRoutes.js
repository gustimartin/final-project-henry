const { Router } = require('express');
const { getOrdes } = require('../handlers/ordesHandler')
const router = Router();

router.get('/', getOrdes)


module.exports = router;