const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categorie')

router.post('/addCategory',categoryController.addCategory)
router.get ('/getCategories', categoryController.getCategories)
module.exports = router