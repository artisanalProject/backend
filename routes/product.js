const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const multer = require('multer');
const jwt = require("../middlewares/jwt")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
router.post('/addProduct',jwt.ensureToken, upload.array('images', 50), productController.addProduct)
router.get('/allProduct', productController.getAllProducts)
router.get('/getProductById/:id', productController.getProductById)
router.delete('/deleteProduct/:id',jwt.ensureToken, productController.deletProduct)
router.put('/updateProduct/:id', upload.array('images', 50),jwt.ensureToken, productController.updateProduct)
router.get('/findProductByCategory/:idCategory',jwt.ensureToken, productController.findProductByCategory)
router.post('/updateReviews/:idUser',jwt.ensureToken, productController.UpdateRating)
router.get('/addToFavoris/:idUser',jwt.ensureToken, productController.addToFavoris)
router.get('/removeFromFavoris/:idUser',jwt.ensureToken, productController.RemoveFromFavoris)
router.get('/verifExistEmailOnReviews/:id/:email',jwt.ensureToken, productController.verifExistEmailOnReviews)
router.put('/acceptProduct',jwt.ensureToken, productController.acceptProduct)
router.put('/refuseProduct',jwt.ensureToken, productController.refuseProduct)
module.exports = router