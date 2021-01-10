var mongoose = require('mongoose');
var Schema = mongoose.Schema

var collectionsSchema = new Schema(
 {
  name: { type: String, required:true },
  description:    { type: String, required:true},
  products:   [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports =  mongoose.model('Collection', collectionsSchema); 