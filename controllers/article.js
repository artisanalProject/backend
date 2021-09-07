const { json } = require('express')
const Article = require('../models/article')
const fs = require('fs');
const jwt = require('jsonwebtoken');
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
    jwt.verify(req.token,process.env.JWT_KEY ,async (err,data)=>{
        if(err){
          res.status(401).json({
            message:"forbiden"
          })
        }
        else {
            try{
                const article =  new Article({
                    title: req.body.title,
                    content:  req.body.content,
                    image:req.file.path,
                })
                    await article.save()
                    res.json(article)
                
               }
               catch(err){
                   console.log(err);
                   res.status(500).json(err)
               }
               
        }
    }) 
}

exports.deleteArticle = async (req,res,next)=>{
    jwt.verify(req.token,process.env.JWT_KEY , async(err,data)=>{
        if(err){
          res.status(401).json({
            message:"forbiden"
          })
        }
        else {
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
    })
    
}

exports.updateArticle = async(req, res, next) => {
    jwt.verify(req.token,process.env.JWT_KEY , async(err,data)=>{
        if(err){
          res.status(401).json({
            message:"forbiden"
          })
        } 
        else {
            try{
                const article = await Article.findById(req.params.id)
                if(article){
                    
                    article.title =req.body.title
                    article.content = req.body.content
                    article.image = req.file.path
                }
              await  article.save()
                res.status(200).json({
                    article : article,
                    message:"updated successfully"})
            }
           catch(err){
               console.log(err);
        res.status(500).json(err)
           }
        
          
        }
    })  

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


exports.addToFavoris = (req, res, next) => {
    jwt.verify(req.token,process.env.JWT_KEY , async(err,data)=>{
        if(err){
          res.status(401).json({
            message:"forbiden"
          })
        } 
        else {
            Article.findById(req.params.id).then(article => {
                article.top = true
                article.save()
                res.json(article)
            }).catch(err => {
                res.json(err)
            })
        }
    })
}
exports.removeFromFavoris = (req, res, next) => {
    jwt.verify(req.token,process.env.JWT_KEY , async(err,data)=>{
        if(err){
          res.status(401).json({
            message:"forbiden"
          })
        } 
        else {
            Article.findById(req.params.id).then(article => {
                article.top = false
                article.save()
                res.json(article)
            }).catch(err => {
                res.json(err)
            })
        }
    })
}