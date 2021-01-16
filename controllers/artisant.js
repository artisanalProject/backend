const Artisant = require('../models/artisant')
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const nodemailer = require("nodemailer");
exports.addArtisant = (req,res,next)=>{
    Artisant.findOne({email:req.body.email},function(err,doc){        
        if(doc!=null)
        res.json("account already exist")
        else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                const artisant = new Artisant({
                    name : req.body.name,
                    email: req.body.email,
                    phoneNumber : req.body.phoneNumber,
                    password: hash,
                    address: req.body.address,
                    storeName: req.body.storeName,
                    typeOfWork: req.body.typeOfWork,
                    codePostale: req.body.codePostal,
                    cin:req.body.cin,
                    creationDate: Date.now(),
                    accountStatus :"not activated"
                })
                artisant.save().then(artisant=>{
                  res.json(artisant)
                }).catch(err=>{
                    console.log("aaaa");
                    res.render(err)
                    console.log(err);
                })
            })
        }
    })
}

exports.loginArtisan = (req,res,next)=>{
    Artisant.findOne({email:req.body.email},function(err,doc){
        if(doc!=null){
         bcrypt.compare(req.body.password, doc.password, function(err, result) {
              if(result) {
                const token = jwt.sign(
                  {
                    email: doc.email,
                    userId: doc._id
                  },
                  process.env.JWT_KEY,
                  {
                      expiresIn: "1h"
                  }
                );
                const { body: { user } } = req;
          
           
              
                if(doc.accountStatus=="not activated"){
                    return res.status(200).json("not activated");
                }
                else {
                    return res.status(200).json({
                        artisan: doc,
                        token: token
                      });
                }
              } else {
                 return res.json("verify email or password")
              } 
            });
        }
        else{
          return  res.json("verify email or password")
        }
    
    })
}


exports.activateAccount =async (req,res,next)=>{
  const artisan=  await Artisant.findByIdAndUpdate(req.params.id,{accountStatus:"activated"});
 // Step 1
let transporter = nodemailer.createTransport({
  
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'salmene.benromdhane@esprit.tn', // TODO: your gmail account
        pass: process.env.PASSWORD || 'Salsalsal020.' // TODO: your gmail password
    }
  });
  
  // Step 2
  let mailOptions = {
    from: 'salmene.benromdhane@esprit.tn', // TODO: email sender
    to: artisan.email, // TODO: email receiver
    subject: 'Activation compte Art & shop',
    text: "M/Mme "+artisan.name+" Votre compte est activé de la part de l'admin avec succès. Vous pouvez maintenat accèder à votre espace et admirer la navigation dans notre plateform. Pour plus d'informations n'hésitez pas de nous contacter via ce num ...."
  };
  
  // Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        res.json(err);
    }
    else res.json("Email sent!")
  });
  
}

