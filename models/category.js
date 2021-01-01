var mongoose = require('mongoose');
var Schema = mongoose.Schema
const MarqueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
})
var categorySchema = new Schema(
 {
  name: { type: String, required:true },
  marque : [MarqueSchema],
});

module.exports =  mongoose.model('Category', categorySchema); 