const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact')

router.post('/addContact', contactController.addContact)
router.get('/getContact', contactController.getContact)
router.post('/verifEmail', contactController.verifExistEmail)

// router.delete('/deletCategory/:id',categoryController.deleteCategory)

module.exports = router