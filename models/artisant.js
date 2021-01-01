var mongoose = require('mongoose');
var Schema = mongoose.Schema

var artisantSchema = new Schema(
 {
  name: { type: String, required:true },
  email:    { type: String, required:true},
  phoneNumber: { type: String, required:true },
  address:    { type: String, required:true},
  storeName: { type: String, required:true },
  typeOfWork:    { type: String, required:true},
  codePostale:    { type: String, required:true},
  cin: { type: String, required:true },
  creationDate:   {type: Date,  required:true},
});

module.exports =  mongoose.model('Artisant', artisantSchema); 