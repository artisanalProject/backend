const Marque = require('../models/marque')

exports.addMarque = (req,res,next)=>{
    const marque = new Marque(req.body)
    marque.save().then(marque=>{
        res.json(marque)
    }).catch(err=>{
        res.render(err)
        console.log(err);
    })
    }
    exports.getMarque = (req, res, next) => {
        Marque.find()
          .then(marques => {
            res.status(200).json(marques);
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Fetching list of marques failed!"
             
            });
        });
      }; 
    