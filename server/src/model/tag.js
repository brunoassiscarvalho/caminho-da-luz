const mongoose = require('../database');

const TagSchema = new mongoose.Schema({ 
  name: { type: String, require: true, unique: true },  
  createdAt: { type: Date, default: Date.now }
})


const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;