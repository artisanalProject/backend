var mongoose = require('mongoose');
var Schema = mongoose.Schema

var transactionsSchema = new Schema(
 {
  reference: { type: String, required:true },
  date: { type: Date, required:true },
  colis:  {type: Schema.Types.ObjectId, ref: 'Colis'},
  order:  {type: Schema.Types.ObjectId, ref: 'Order'}
 
});

module.exports =  mongoose.model('Transaction', transactionsSchema); 