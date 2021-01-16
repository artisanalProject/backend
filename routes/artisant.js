const express = require('express')
const router = express.Router()
const artisantController = require('../controllers/artisant')

router.post('/addArtisant',artisantController.addArtisant)
router.get('/getArtisant',artisantController.getArtisant)
module.exports = router