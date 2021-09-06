var mongoose = require('mongoose');
var Schema = mongoose.Schema

var clientSchema = new Schema(
 {
  firstName: { type: String, required:true },
  lastName: { type: String, required:true },
  gender: { type: String, required:true },
  email:    { type: String, required:true},
  phoneNumber: { type: String, required:true },
  fax: { type: String, required:false },
  storeName: { type: String, required:false },
  address:    { type: String, required:true},
  country:    { type: String, required:true},
  city:    { type: String, required:true}
  
});

module.exports =  mongoose.model('Client', clientSchema); 