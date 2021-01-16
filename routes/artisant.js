const express = require('express')
const router = express.Router()
const artisantController = require('../controllers/artisant')

router.post('/addArtisant',artisantController.addArtisant)
router.post('/loginArtisant',artisantController.loginArtisan)
router.get('/activateAccount/:id',artisantController.activateAccount)
module.exports = router