const express = require('express')
const router = express.Router()
const marqueController = require('../controllers/marque')
const jwt = require("../middlewares/jwt")

router.post('/addMarque',jwt.ensureToken,marqueController.addMarque)
router.get('/getMarques',jwt.ensureToken, marqueController.getMarque)
router.get('/getMarquesById/:idCategory',jwt.ensureToken, marqueController.getMarqueByCategoryId)
router.delete('/deletMarque/:id',jwt.ensureToken,marqueController.deleteMarque)
router.put('/updateMarque/:id',jwt.ensureToken,marqueController.updateMarque)
module.exports = router