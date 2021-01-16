const Artisant = require('../models/artisant')

exports.addArtisant = (req,res,next)=>{
    const artisant = new Artisant({
        name : req.body.name,
        email: req.body.email,
        phoneNumber : req.body.phoneNumber,
        password: req.body.password,
        address: req.body.address,
        storeName: req.body.storeName,
        typeOfWork: req.body.typeOfWork,
        codePostale: req.body.codePostale,
        cin:req.body.cin,
        creationDate: Date.now()
    })
    artisant.save().then(artisant=>{
        res.json(artisant)
    }).catch(err=>{
        console.log("aaaa");
        res.render(err)
        console.log(err);
    })
    }

    exports.getArtisant = (req,res,next)=>{
        Artisant.find().then(artisant=>{
            res.status(200).json(artisant);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Fetching list of artisant failed!"
           
          });
      });
    }