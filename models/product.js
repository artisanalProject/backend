var mongoose = require('mongoose');
var Schema = mongoose.Schema

var productSchema = new Schema(
 {
  name: { type: String, required:true },
  price:    { type: Number, required:true},
  ref: { type: String, required:true },
  quantity:    { type: Number, required:true},
  images: {  type: [String], required:true },
  status:    { type: String, required:true},
  createdByAdmin:    { type: Boolean, required:true},
  topProduct:    { type: Boolean, required:true},
  tva: { type: Number, required:true },
  taxe:    { type: Number, required:true},
  remise: { type: Number, required:true },
  creationDate: { type: Date, required:true },
  category:   {type: Schema.Types.ObjectId, ref: 'Category'},
  marque:   {type: Schema.Types.ObjectId, ref: 'Marque'},
  collections:  {type: Schema.Types.ObjectId, ref: 'Collection', required:false},
  artisant:  {type: Schema.Types.ObjectId, ref: 'Artisant'}
});

module.exports =  mongoose.model('Product', productSchema); 