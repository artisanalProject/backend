var mongoose = require('mongoose');
var Schema = mongoose.Schema

var marqueSchema = new Schema(
 {
  name: { type: String, required:true },
  category:  {type: Schema.Types.ObjectId, ref: 'Category'},
});

module.exports =  mongoose.model('Marque', marqueSchema); 