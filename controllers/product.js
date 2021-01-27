const Product = require('../models/product')

exports.addProduct = (req,res,next)=>{
  
    const product = new Product({
        name:req.body.name,
        price:req.body.prix,
        ref:req.body.reference,
        quantity:req.body.quantity,
        status: "en stock",
        createdByAdmin:true,
        category:req.body.category,
        marque:req.body.marque,
      //  collections:req.body.collections,
        artisant:req.body.artisant,
        topProduct:false,
        description:req.body.description,
        remise :  req.body.remise,
        new:req.body.new,
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
      console.log(product);
        res.json(product)
    }).catch(error => {
      
    console.log(error);
      res.status(500).json({
          message: "failed to create a produuct"
      });
    })
    }

  exports.getAllProducts = (req, res, next) => {
      Product.find().populate('artisant category').exec()
        .then(products => {
          res.status(200).json(products);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Fetching list of products failed!"
           
          });
      });
    }; 
    exports.getProductById = (req, res, next) => {
      Product.findById(req.params.id).populate('artisant category marque collections').exec()
        .then(product => {
          res.status(200).json(product);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Fetching product failed!"
           
          });
      });
    }; 
    exports.deletProduct = (req, res, next) => {
      Product.findByIdAndDelete(req.params.id).exec()
        .then(() => {
          res.status(200).json({message:"deleted"});
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
              message: "failed to delete"
          });
      });
    }; 
    exports.updateProduct = async (req, res, next) => {
      console.log(req.files);
      if(req.files!=undefined){
           
           req.files.forEach(element => {  
      
     Product.findByIdAndUpdate(req.params.id,req.body, {$push :{images:element.path}}).then(
       ()=>{
         res.status(200).json({message:"updated"})
       }
     ).catch(error=>{
      res.status(500).json({
        message: "failed to delete"
    });
     })
    });
    }
  }
  exports.findProductByCategory = (req, res, next) => {
  Product.find({category:req.params.idCategory}).then(products=>{
    res.status(200).json(products)
  }).catch(err=>{
    res.status(500).json({
      message: "no product found"
    })
  })
  }