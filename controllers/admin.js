const Admin = require('../models/admin')
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
   
exports.addAdmin = (req,res,next)=>{
    Admin.findOne({email:req.body.email},function(err,doc){        
        if(doc!=null)
        res.json("account already exist")
        else{
           const admin = new Admin(req.body)
                admin.password=encrypt(req.body.password)
                admin.save().then(ad=>{
                  res.json(ad)
                }).catch(err=>{
                    res.render(err)
                    console.log(err);
                })
        }
    })
}



exports.loginAdmin = (req,res,next)=>{
    Admin.findOne({email:req.body.email},function(err,doc){
        if(doc!=null){
           if(req.body.password==decrypt(doc.password)) {
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
          
           
              
                
                    return res.status(200).json({
                        admin: doc,
                        token: token
                      });
             
              } else {
                 return res.json("verify email or password")
              } 
         
        }
        else{
          return  res.json("verify email or password")
        }
    
    })
}


exports.forgotPwd = async (req,res,next)=>{
    const artisan=  await Artisant.findOne({email:req.query.emailTo});
    const admin=  await Admin.findOne({email:req.query.emailTo});
    if(artisan!=null || admin!=null){
      
       // Step 1
   let transporter = nodemailer.createTransport({
     
    service: 'gmail',
    secure:true,
    auth: {
        user: process.env.EMAIL || 'mokhleshaj@gmail.com', // TODO: your gmail account
        pass: process.env.PASSWORD || 'Mokhles 07212' // TODO: your gmail password
    }
  });
  if(admin){
    var txt="M/Mme "+admin.name+", Voici votre mot de passe : "+decrypt(admin.password)
    var receiver= admin.email
  }else{
    var txt="M/Mme "+artisan.name+", Voici votre mot de passe : "+decrypt(artisan.password)
    var receiver= artisan.email
  }
  // Step 2
  let mailOptions = {
    from: 'mokhleshaj@gmail.com', // TODO: email sender
    to: receiver, // TODO: email receiver
    subject: 'Art & shop : Mot de passe oublié',
    text: txt
  };
  
  // Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      
      console.log(err);
        res.json(err);
    }
  
    else{
      console.log("email sent");
      res.json("Email sent!")}
  }); 
    }
    else {
        res.json("account not found")
    }
    
    
    
}
