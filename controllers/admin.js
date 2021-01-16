const Admin = require('../models/admin')
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');


exports.addAdmin = (req,res,next)=>{
    Admin.findOne({email:req.body.email},function(err,doc){        
        if(doc!=null)
        res.json("account already exist")
        else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                const admin = new Admin(req.body)
                admin.password=hash
                admin.save().then(ad=>{
                  res.json(ad)
                }).catch(err=>{
                    res.render(err)
                    console.log(err);
                })
            })
        }
    })
}



exports.loginAdmin = (req,res,next)=>{
    Admin.findOne({email:req.body.email},function(err,doc){
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
          
           
              
                
                    return res.status(200).json({
                        admin: doc,
                        token: token
                      });
             
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