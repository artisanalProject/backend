const Contact = require('../models/contact')
const jwt = require('jsonwebtoken');
exports.addContact = (req, res, next) => {
    const contact = new Contact(req.body)
    contact.save().then(contact => {
        res.json(contact)
    }).catch(err => {

    })
}
exports.getContact = (req, res, next) => {
    jwt.verify(req.token,process.env.JWT_KEY , (err,data)=>{
        if(err){
          res.status(401).json({
            message:"forbiden"
          })
        }
        else {
            Contact.find()
            .then(contact => {
                res.status(200).json(contact);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "Fetching list of contacts failed!"
    
                });
            });
        }
    })
  
};

exports.getContactById = (req, res, next) => {
    jwt.verify(req.token,process.env.JWT_KEY , (err,data)=>{
        if(err){
          res.status(401).json({
            message:"forbiden"
          })
        }
        else {
            Contact.findById(req.params.id)
            .then(contact => {
                res.status(200).json(contact);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "Fetching list of contacts failed!"
    
                });
            });
        }
    })
};

exports.changeStatus = async(req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if(contact){
            contact.status = "readed"
            contact.save()
            res.status(200).json({message:"contact status changed"})
        }
        else res.status(400).json({message:"cannot find contact"})
    }
    catch(e){
        res.status(500).json(e)
    }
  
};

exports.verifExistEmail = (req, res, next) => {
    Contact.findOne({ email: req.body.email }).then(
        contact => {
            if (contact) {
                res.json(true)
            } else
                res.json(false)
        }
    )
}