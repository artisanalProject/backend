var mongoose = require('mongoose');
var Schema = mongoose.Schema

var invoiceSchema = new Schema(
 {
  reference: { type: String, required:true },
  date: { type: Date, required:true },
  status: { type: String, required:true },
  order:  {type: Schema.Types.ObjectId, ref: 'Order'}
});

module.exports =  mongoose.model('Invoice', invoiceSchema); 