const express = require('express')
const router = express.Router()
const marqueController = require('../controllers/marque')

router.post('/addMarque',marqueController.addMarque)
router.get('/getMarques', marqueController.getMarque)
module.exports = router