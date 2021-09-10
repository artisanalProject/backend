const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact')
const jwt = require("../middlewares/jwt")
router.post('/addContact', contactController.addContact)
router.get('/getContact', jwt.ensureToken, contactController.getContact)
router.post('/verifEmail', contactController.verifExistEmail)
router.get('/getContactById/:id', jwt.ensureToken, contactController.getContactById)
router.get('/changeStatus/:id', jwt.ensureToken, contactController.changeStatus)
router.get('/nbContacts', jwt.ensureToken, contactController.nbContacts)
// router.delete('/deletCategory/:id',categoryController.deleteCategory)

module.exports = router