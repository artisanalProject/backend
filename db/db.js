const mongoose=require('mongoose');
const app = require('../app');

// connection to database
mongoose.connect('mongodb+srv://mokhles:YVXZRH7nKS2yBSUl@cluster0.cwtst.mongodb.net/artisana?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(result => {
  
    console.log("connected to database");
}).catch(err => {
    console.log(err);
  }); 
  