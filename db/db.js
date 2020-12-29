const mongoose=require('mongoose')

// connection to database
mongoose.connect('mongodb://localhost:27017/e-commerce', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(result => {
  
    console.log("connected to database");
}).catch(err => {
    console.log(err);
  }); 