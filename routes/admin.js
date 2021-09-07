const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')
const jwt = require("../middlewares/jwt")
router.post('/addAdmin',jwt.ensureToken,adminController.addAdmin)
router.post('/loginAdmin',adminController.loginAdmin)
router.get('/forgotPwd',jwt.ensureToken,adminController.forgotPwd)
module.exports = router