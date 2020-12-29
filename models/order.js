var mongoose = require('mongoose');
var Schema = mongoose.Schema

var orderSchema = new Schema(
 {
  reference: { type: String, required:true },
  date: { type: Date, required:true },
  status: { type: String, required:true },
  payementMethod: { type: String, required:true },
  refetotalPrice: { type: String, required:true },
  products:  [{type: Schema.Types.ObjectId, ref: 'Product'}],
  invoice:  {type: Schema.Types.ObjectId, ref: 'Invoice'},
  client:  {type: Schema.Types.ObjectId, ref: 'Client'},
});

module.exports =  mongoose.model('Order', orderSchema); 