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

    exports.getCategories = (req, res, next) => {
        Categorie.find()
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