var mongoose = require('mongoose');
var Schema = mongoose.Schema

var contactSchema = new Schema(
 {
  name: { type: String, required:true },
  lastName:    { type: String, required:true},
  phoneNumber: { type: String, required:true },
  email:    { type: String, required:true},
  message: { type: String, required:true },
  status : {type:String , default:"unreaded", required:true},
  
},
{ timestamps: true });

module.exports =  mongoose.model('Contact', contactSchema); 