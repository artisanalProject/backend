const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categorie')
const jwt = require("../middlewares/jwt")

router.post('/addCategory',jwt.ensureToken,categoryController.addCategory)
router.get ('/getCategories', categoryController.getCategories)
router.delete('/deletCategory/:id',jwt.ensureToken,categoryController.deleteCategory)
router.put('/updateCategory/:id',jwt.ensureToken,categoryController.updateCategory)

module.exports = router