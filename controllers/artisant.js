const Artisant = require('../models/artisant')

exports.addArtisant = (req,res,next)=>{
    const artisant = new Artisant({
        name : req.body.name,
        email: req.body.email,
        phoneNumber : req.body.address,
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