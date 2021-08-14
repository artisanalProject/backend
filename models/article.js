var mongoose = require('mongoose');
var Schema = mongoose.Schema

var articleSchema = new Schema(
 {
  title: { type: String, required:true },
  content:    { type: String, required:true},
  image: {type: String, required:false},
  top : {type:Boolean, required:false},
  hits: {type:Number, default:0, required:false},
  comments: [{
    name:{type:String},
    email:{type:String},
    comment:{type:String},
    date: {type: Date ,default: Date.now() }
  },]
},
{timestamps:true});

module.exports =  mongoose.model('Article', articleSchema); 