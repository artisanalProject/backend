const Contact = require('../models/contact')

exports.addContact = (req,res,next)=>{
    const contact = new Contact(req.body)
    contact.save().then(contact=>{
        res.json(contact)
    }).catch(err=>{
       
    })
    }
    exports.getContact = (req, res, next) => {
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
      }; 