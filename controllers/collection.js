const Collection = require('../models/collection')

exports.addCollection = (req,res,next)=>{
    const collection = new Collection(req.body)
    collection.save().then(collection=>{
        res.json(collection)
    }).catch(err=>{
        res.render(err)
        console.log(err);
    })
    }

    exports.getCollections = (req, res, next) => {
        Collection.find()
          .then(collections => {
            res.status(200).json(collections);
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Fetching list of collections failed!"
             
            });
        });
      };   