var mongoose = require('mongoose');
var Schema = mongoose.Schema
const categorySchema = new Schema(
 {
  name: { type: String, required:true },
  marque : [{type: Schema.Types.ObjectId, ref: 'Marque'}],
});

module.exports =  mongoose.model('Category', categorySchema);