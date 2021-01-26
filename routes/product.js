const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const multer = require ('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
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
router.post('/addProduct',upload.array('images', 50), productController.addProduct)
router.get('/allProduct',productController.getAllProducts)
router.get('/getProductById/:id',productController.getProductById)
router.delete('/deleteProduct/:id',productController.deletProduct)
router.put('/updateProduct/:id',productController.updateProduct)
module.exports = router