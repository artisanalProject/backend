const express = require('express')
const router = express.Router()
const artisantController = require('../controllers/artisant')
const token = require('../controllers/token')
router.post('/addArtisant',artisantController.addArtisant)
router.post('/loginArtisant',artisantController.loginArtisan)
router.get('/activateAccount/:id',token.ensureToken,artisantController.activateAccount)
router.get('/NotActivatedAccounts',token.ensureToken,artisantController.NotActivatedAccounts)
module.exports = router