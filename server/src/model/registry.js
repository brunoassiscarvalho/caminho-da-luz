const { Schema } = require('../database');
const mongoose = require('../database');

const RegistrySchema = new mongoose.Schema({
  participant: { type: Schema.Types.ObjectId, ref: 'Participant' },
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  createdAt: { type: Date, default: Date.now }
})

RegistrySchema.index({ participant: 1, event: 1 }, { unique: true });


const Registry = mongoose.model('Registry', RegistrySchema);
module.exports = Registry;