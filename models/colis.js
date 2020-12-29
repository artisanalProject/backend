var mongoose = require('mongoose');
var Schema = mongoose.Schema

var colisSchema = new Schema(
 {
  reference: { type: String, required:true },
  name: { type: String, required:true },
  status: { type: String, required:true },
  destination: { type: String, required:true },
  order:  {type: Schema.Types.ObjectId, ref: 'Order'},
 
});

module.exports =  mongoose.model('Colis', colisSchema); 