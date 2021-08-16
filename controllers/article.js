const { json } = require('express')
const Article = require('../models/article')
const fs = require('fs');

exports.getAllArticles = async (req,res,next)=>{
    try{
        const articles = await Article.find().exec()
        if (articles){
            res.status(200).json(articles)
        }
        else res.status(400).json({message:"there is no articles"})
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}
exports.getAllArticleById = async (req,res,next)=>{
    try{
        const articles = await Article.findById(req.params.id).exec()
        if (articles){
            res.status(200).json(articles)
        }
        else res.status(400).json({message:"there is no articles"})
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}
exports.addArticle = async (req,res,next)=>{
    try{
    const article =  new Article({
        title: req.body.title,
        content:  req.body.content,
        image:req.file.path,
        top : req.body.top,
    })
  const comment = JSON.parse(req.body.comment)
    article.comments.push(comment)
        await article.save()
        res.json(article)
    
   }
   catch(err){
       console.log(err);
       res.status(500).json(err)
   }
    
}

exports.deleteArticle = async (req,res,next)=>{
 try{
  const article =   await Article.findById(req.params.id)
  if(article){
      await article.deleteOne()
    fs.unlink(article.image, (err) => {
        if (err) throw err;
    });
    res.status(200).json({message:"deleted successfully"})
  }
  
 }
 catch(err){
     res.status(500).json(err)
 }
    
}

exports.updateArticle = async(req, res, next) => {
    oldImages = JSON.parse(req.body.oldImages)
    let paths = [];
    if (oldImages.length > 0) {
        oldImages.forEach(element => {
            paths.push(element)
        });
    }
    if (req.files) {
        req.files.forEach(element => {
            paths.push(element.path)
        });
        Article.findByIdAndUpdate(req.params.id, { images: paths }).then(
            () => {
                Article.findByIdAndUpdate(req.params.id, req.body).then(
                    () => {
                        res.status(200).json({
                            message: "updated"
                        });
                    }
                ).catch(error => {
                    console.log(error);

                    res.status(500).json({
                        message: "failed to delete"
                    });
                })
            }
        ).catch(error => {
            console.log(error);

            res.status(500).json({
                message: "failed to delete"
            });
        })
        

    }

}
exports.addHit = async (req,res,next)=>{
    try{
        const article = await Article.findById(req.params.id)
        if(article){
            article.hits +=1
            article.save()
            res.status(200).json({message:"hits added"})
        }
        else res.json(400).json({message:"article not found"})
      
    }
  catch(err){
      res.status(500).json(err)
  }
}
exports.addComment = async (req,res,next)=>{
    try{
        const article = await Article.findById(req.params.id)
        if(article){
           article.comments.push(req.body)
            article.save()
            res.status(200).json({message:"comment added successfully"})
        }
        else res.json(400).json({message:"article not found"})
      
    }
  catch(err){
      console.log(err);
      res.status(500).json(err)
  }
}