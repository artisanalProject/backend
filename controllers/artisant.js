const Artisant = require('../models/artisant')
const jwt= require('jsonwebtoken');
const nodemailer = require("nodemailer");
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password ='d6F3Efeq';

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
   
  function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }

exports.addArtisant = (req,res,next)=>{
    Artisant.findOne({email:req.body.email},function(err,doc){        
        if(doc!=null)
        res.json("account already exist")
        else{
            
              const artisant = new Artisant({
                    name : req.body.name,
                    email: req.body.email,
                    phoneNumber : req.body.phoneNumber,
                    password: encrypt(req.body.password),
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
                    res.render(err)
                    console.log(err);
                })
            
        }
    })
}

exports.loginArtisan = (req,res,next)=>{
    Artisant.findOne({email:req.body.email},function(err,doc){
        if(doc!=null){
              if(decrypt(doc.password)==req.body.password) {
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

exports.NotActivatedAccounts = (req,res,next)=>{
  Artisant.find({accountStatus:"not activated"}).exec()
        .then(docs => {
          res.status(200).json(docs);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
              message: "No pending requests!"
           
          });
      });
}