const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')
const multer = require("../middlewares/multer")
const jwt = require("../middlewares/jwt")

router.post("/addArticle", multer.upload.single('image'), jwt.ensureToken, articleController.addArticle)
router.delete('/deleteArticle/:id', jwt.ensureToken, articleController.deleteArticle)
router.get("/getArticles", articleController.getAllArticles)
router.get("/getArticlesById/:id", articleController.getAllArticleById)
router.put("/updateArticle/:id", jwt.ensureToken, multer.upload.single('image'), articleController.updateArticle)
router.get("/addHit/:id", articleController.addHit)
router.put("/addComment/:id", articleController.addComment)
router.get("/addToFavoris/:id", jwt.ensureToken, articleController.addToFavoris)
router.get("/removeFromFavoris/:id", jwt.ensureToken, articleController.removeFromFavoris)

module.exports = router