var mongoose = require('mongoose');
var Schema = mongoose.Schema

var articleSchema = new Schema(
 {
  title: { type: String, required:true },
  content:    { type: String, required:true},
  image: {type: String, required:false},
  top : {type:Boolean, required:false},
  comments: [{
    name:{type:String},
    email:{type:String},
    comment:{type:String}
  }]
},
{timestamps:true});

module.exports =  mongoose.model('Article', articleSchema); 