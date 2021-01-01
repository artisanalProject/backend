const Product = require('../models/product')

exports.addProduct = (req,res,next)=>{
  console.log("aaa");
    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        ref:req.body.ref,
        quantity:req.body.quantity,
        status: req.body.status,
        createdByAdmin:true,
        tva:req.body.tva,
        taxe:req.body.taxe,
        remise:req.body.remise,
        categorie:req.body.category,
        marque:req.body.marque,
        collections:req.body.collections,
        artisant:req.body.artisant,
        creationDate: Date.now()
    })
    if(req.files!=undefined){
      
        let tabImage=[]
        req.files.forEach(element => {
          tabImage.push(element.path)
        });
        product.images=tabImage
      }
      
    product.save().then(product=>{
        res.json(product)
    }).catch(error => {
      res.status(500).json({
          message: "failed to create a produuct"
      });
    })
    }

  exports.getAllProducts = (req, res, next) => {
      Product.find().populate('categorie artisant').exec()
        .then(products => {
          res.status(200).json(products);
        })
        .catch(error => {
          res.status(500).json({
              message: "Fetching list of products failed!"
          });
      });
    };