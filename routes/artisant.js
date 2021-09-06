const express = require('express')
const router = express.Router()
const artisantController = require('../controllers/artisant')
const token = require('../controllers/token')
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
router.post('/addArtisant',artisantController.addArtisant)
router.post('/createArtisant',jwt.ensureToken,artisantController.createArtisant)

router.post('/loginArtisant', artisantController.loginArtisan)
router.get('/activateAccount/:id', token.ensureToken, artisantController.activateAccount)
router.get('/NotActivatedAccounts', token.ensureToken, artisantController.NotActivatedAccounts)
router.post('/RequestProduct', upload.array('images', 50),jwt.ensureToken, artisantController.RequestProduct)
router.get('/getArtisant', artisantController.getArtisant)
router.put('/updateProfile',jwt.ensureToken, artisantController.updateProfile)
router.delete('/deleteAccount/:id',jwt.ensureToken, artisantController.deleteAccount)
router.put('/changePassword',jwt.ensureToken, artisantController.changePassword)
module.exports = router