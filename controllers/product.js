const Product = require('../models/product')

exports.addProduct = (req,res,next)=>{
  console.log("aaa");
    const product = new Product({
        name:req.body.name,
        price:req.body.prix,
        ref:req.body.reference,
        quantity:req.body.quantity,
        status: "yes",
        createdByAdmin:true,
        category:req.body.category,
        marque:req.body.marque,
        collections:req.body.collections,
        artisant:req.body.artisant,
        topProduct:true,
        description:req.body.description,
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
      console.log("aaa");
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
      const id = req.body.id
      const updatedName = req.body.name;
      const updatedReference = req.body.reference;
      const updatedDescription = req.body.description;
      const updatedPrice = parseFloat(req.body.price);
      const updatedStatus =  req.body.status;
      const updatedProvider = JSON.parse(req.body.provider);
      const updatedCategory = await Category.findById(JSON.parse(req.body.category)) ;
     // const updatedsubCategory = req.body.subCategory;
      const updatedQuantity = parseInt(req.body.quantity)
      Product.findById(id)
        .then(product => {
          
          product.name = updatedName;
          product.reference = updatedReference;
          product.description = updatedDescription;
          product.price = updatedPrice;
          product.status = updatedStatus;
          product.provider= updatedProvider;
          product.category = updatedCategory._id;
         // product.subCategory= updatedsubCategory;
          product.quantity = updatedQuantity;
          if(req.files!=undefined){
  
            
            let tabImage=[]
            req.files.forEach(element => {
  
              
              tabImage.push(element.path)
            });
            oldImages=JSON.parse(req.body.old);
            oldImages.forEach(element => {
   
              
              tabImage.push(element)
            });
            
           product.image=tabImage
          }
          
          
          
          return product.save();
        })
        .then(result => {
   
          res.status(200).json({ message: "Update successful!" });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Couldn't udpate product!"+error
          });
      });
    };