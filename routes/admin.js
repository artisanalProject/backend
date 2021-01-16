const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

router.post('/addAdmin',adminController.addAdmin)
router.post('/loginAdmin',adminController.loginAdmin)
router.post('/forgotPwd',adminController.forgotPwd)
module.exports = router