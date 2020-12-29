const Product = require('../models/product')

exports.addProduct = (req,res,next)=>{
    const product = new Product(req.body)
    product.save().then(product=>{
        res.json(product)
    }).catch(err=>{
        res.render(err)
        console.log(err);
    })
    }