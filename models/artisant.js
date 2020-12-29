var mongoose = require('mongoose');
var Schema = mongoose.Schema

var artisantSchema = new Schema(
 {
  name: { type: String, required:true },
  email:    { type: String, required:true},
  phoneNumber: { type: String, required:true },
  address:    { type: String, required:true},
  storeName: { type: String, required:true },
  TypeOfWork:    { type: String, required:true},
  date: { type: Date, required:true },
  codePostale:    { type: String, required:true},
  cin: { type: String, required:true },
  creationDate:   {type: Schema.Types.ObjectId, ref: 'Categorie'},
});

module.exports =  mongoose.model('Artisant', artisantSchema); 