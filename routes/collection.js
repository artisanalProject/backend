const express = require('express')
const router = express.Router()
const collectionController = require('../controllers/collection')

router.post('/addCollection',collectionController.addCollection)
router.get('/getCollections',collectionController.getCollections)
module.exports = router