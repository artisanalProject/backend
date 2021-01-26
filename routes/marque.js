const express = require('express')
const router = express.Router()
const marqueController = require('../controllers/marque')

router.post('/addMarque',marqueController.addMarque)
router.get('/getMarques', marqueController.getMarque)
router.get('/getMarquesById/:idCategory', marqueController.getMarqueByCategoryId)
router.delete('/deletMarque/:id',marqueController.deleteMarque)
router.put('/updateMarque/:id',marqueController.updateMarque)
module.exports = router