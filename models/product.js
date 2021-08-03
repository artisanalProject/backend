var mongoose = require('mongoose');
var Schema = mongoose.Schema

var productSchema = new Schema(
 {
  name: { type: String, required:true },
  description: { type: String, required:true },
  price:    { type: Number, required:true},
  ref: { type: String, required:true },
  quantity:    { type: Number, default:0},
  remise:    { type: Number, required:false,default:0},
  stock:    { type: Number, required:true},
  images: {  type: [String], required:true },
  status:    { type: String, required:true},
  createdByAdmin:    { type: Boolean, required:false},
  topProduct:    { type: Boolean, default:false},
  creationDate: { type: Date, required:true },
  category:   {type: Schema.Types.ObjectId, ref: 'Category', required:false},
  marque:   {type: Schema.Types.ObjectId, ref: 'Marque', required:false},
  artisant:  {type: Schema.Types.ObjectId, ref: 'Artisant',required:false},
  sellingNumber:{type:Number,default:0},
  rating: [{
    rateNumber:{type:Number,default:0},
    name:{type:String},
    email:{type:String},
    subject:{type:String},
    description:{type:String}
  }],
  ratingMoyenne: {type:Number, required:false}
});

module.exports =  mongoose.model('Product', productSchema); 