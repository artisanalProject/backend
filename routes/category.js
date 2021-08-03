const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categorie')

router.post('/addCategory',categoryController.addCategory)
router.get ('/getCategories', categoryController.getCategories)
router.delete('/deletCategory/:id',categoryController.deleteCategory)
router.put('/updateCategory/:id',categoryController.updateCategory)

module.exports = router