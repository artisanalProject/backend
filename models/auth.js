var mongoose = require('mongoose');
var Schema = mongoose.Schema

var authSchema = new Schema(
 {
  email:    { type: String, required:true},
  password: { type: String, required:true },
  role: { type: String, required:true },
  accountStatus: { type: String, required:true },
  creationDate: { type: Date, required:true },
  
});

module.exports =  mongoose.model('Auth', authSchema); 