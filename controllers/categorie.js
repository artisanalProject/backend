const Categorie = require('../models/category')
const Marque = require('../models/marque')
const Product = require('../models/product')
const jwt = require('jsonwebtoken');
exports.addCategory = (req,res,next)=>{
  jwt.verify(req.token,process.env.JWT_KEY , (err,data)=>{
    if(err){
      res.status(401).json({
        message:"forbiden"
      })
    }
    else {
      const category = new Categorie(req.body)
      category.save().then(category=>{
          res.json(category)
      }).catch(err=>{
          res.render(err)
          console.log(err);
      })
    }
  })
    }

    exports.getCategories = (req, res, next) => {
        Categorie.find().populate("marque").exec()
          .then(categories => {
            res.status(200).json(categories);
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Fetching list of categories failed!"
             
            });
        });
      }; 

      exports.deleteCategory = (req, res, next) => {
        jwt.verify(req.token,process.env.JWT_KEY , (err,data)=>{
          if(err){
            res.status(401).json({
              message:"forbiden"
            })
          }
          else {
            Categorie.findById(req.params.id).then(category=>{
              Marque.findOne({category:category._id}).then(marque=>{
                if (marque){
                 marque.remove({})
                }
              })
              
              category.deleteOne()
              Product.updateOne({category:req.params.id}, {$unset: {field: 1 }});
            }).then(()=>{ res.status(200).json({message:"deleted"});})
            .catch(err=>{
              res.status(500).json({message:"err"+err})
            })
          }
        })

      }; 

      exports.updateCategory = (req,res,next)=>{
        jwt.verify(req.token,process.env.JWT_KEY , (err,data)=>{
          if(err){
            res.status(401).json({
              message:"forbiden"
            })
          }
          else {
            Categorie.findById(req.params.id).then(product=>{
              product.name = req.body.name
              return product.save()
            }).then(() => {
              res.status(200).json({message:"updated"});
            })
            .catch(error => {
              console.log(error);
              res.status(500).json({
                  message: "failed to update"
              });
          });
          }
        })
      }