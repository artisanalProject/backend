const category = require('../models/category')
const Marque = require('../models/marque')
const jwt = require('jsonwebtoken');
exports.addMarque = (req, res, next) => {
  jwt.verify(req.token,process.env.JWT_KEY , (err,data)=>{
    if(err){
      res.status(401).json({
        message:"forbiden"
      })
    }
    else {
      const marque = new Marque(req.body)
      marque.save().then(async (marque) => {
        await category.findByIdAndUpdate(req.body.category, { $push: { marque: marque._id } })
        res.json(marque)
    
      }).catch(err => {
        res.render(err)
        console.log(err);
      })
    }
 
})
}
exports.getMarque = (req, res, next) => {
  Marque.find().populate("category").exec()
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
exports.getMarqueByCategoryId = (req, res) => {
  Marque.find({ category: req.params.idCategory }).exec().then(
    marques => {
      res.status(200).json(marques)
    }
  ).catch(err => {
    console.log(err);
    console.log("ssss")
    res.status(500).json({

      message: "Fetching list of marques failed!"

    })
  })
}

// exports.deleteMarque = (req, res, next) => {
//   Marque.findById(req.params.id)
//     .then(marque => {
//       marque.remove({}).then(() => { res.status(200).json({ message: "deleted" }); })
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({
//         message: "failed to delete"
//       });
//     });
// };
exports.deleteMarque = (req, res, next) => {
  jwt.verify(req.token,process.env.JWT_KEY , (err,data)=>{
    if(err){
      res.status(401).json({
        message:"forbiden"
      })
    }
    else {
      Marque.findById(req.params.id)
      .then(marque => {
        marque.deleteOne().then(() => { res.status(200).json({ message: "deleted" }); })
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "failed to delete"
        });
      });
    }
  })
};

exports.updateMarque = (req, res, next) => {
  jwt.verify(req.token,process.env.JWT_KEY , (err,data)=>{
    if(err){
      res.status(401).json({
        message:"forbiden"
      })
    } 
    else {
      Marque.findById(req.params.id).then(marque => {
        marque.name = req.body.name
        marque.category = req.body.category
        return marque.save()
      }).then(() => {
        res.status(200).json({ message: "updated" });
      })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: "failed to update"
          });
        });
    }
  })
}