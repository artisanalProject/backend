var mongoose = require('mongoose');
var Schema = mongoose.Schema
const MarqueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {type: Schema.Types.ObjectId, ref: 'Category'}
})
module.exports =  mongoose.model('Marque', MarqueSchema);