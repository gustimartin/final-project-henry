const { Router } = require('express');
const {createPublicationsHandler} = require('../handlers/publicationsHandler')
const {getPublicationsHandler} = require('../handlers/publicationsHandler')


const router = Router();




router.post('/', createPublicationsHandler )
router.get('/', getPublicationsHandler)







module.exports = router;


