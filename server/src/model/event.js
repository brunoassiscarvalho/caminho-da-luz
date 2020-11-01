const { Schema } = require('../database');
const mongoose = require('../database');

const EventSchema = new mongoose.Schema({
  name:{type: String, require: true},
  description: { type: String, require: true },
  date: { type: Date, require: true },
  capacity: { type: Number },
  closeDate: { type: Date },
  tag: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now }
})


const Event = mongoose.model('Event', EventSchema);
module.exports = Event;