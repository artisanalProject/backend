const Categorie = require('../models/category')

exports.addCategory = (req,res,next)=>{
    const category = new Categorie(req.body)
    category.save().then(category=>{
        res.json(category)
    }).catch(err=>{
        res.render(err)
        console.log(err);
    })
    }

    