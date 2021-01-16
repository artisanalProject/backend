const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

router.post('/addAdmin',adminController.addAdmin)
router.post('/loginAdmin',adminController.loginAdmin)

module.exports = router