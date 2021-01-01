const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categorie')

router.post('/addCategory',categoryController.addCategory)

module.exports = router