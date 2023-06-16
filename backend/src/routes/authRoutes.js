const { Router } = require('express');
const {authHandler} = require('../handlers/authHandler')
const { getUser } = require('../handlers/authHandler')
const { enableUsers, getEnable } = require('../handlers/authHandler')

const router = Router();

router.post('/', authHandler)
router.get('/',getUser)
router.patch('/:id', enableUsers)
router.get('/enable', getEnable  )

module.exports = router;