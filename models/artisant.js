var mongoose = require('mongoose');
var Schema = mongoose.Schema

var artisantSchema = new Schema(
 {
  name: { type: String, required:true },
  email:    { type: String, required:true},
  password:    { type: String, required:true},
  phoneNumber: { type: String, required:false },
  address:    { type: String, required:false},
  storeName: { type: String, required:false },
  typeOfWork:    { type: String, required:false},
  codePostale:    { type: String, required:false},
  cin: { type: String, required:false },
  creationDate:   {type: Date,  required: false},
  accountStatus: { type: String, required:false },
});

module.exports =  mongoose.model('Artisant', artisantSchema); 