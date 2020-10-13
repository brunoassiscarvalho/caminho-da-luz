const mongoose = require('../database');
// const bcrypt = require('bcryptjs') 

const ParticipantSchema = new mongoose.Schema({
  name: { type: String, require: true },
  cpf: { type: String, require: true, unique: true, },
  profession: { type: String },
  birthDate: { type: Date },
  civilState: { type: Number },
  originState: { type: String },
  originCity: { type: String },
  address: {
    cep: { type: String },
    neighbor: { type: String },
    street: { type: String },
    number: { type: String },
    complement: { type: String },
  },
  tel: { type: [String] },
  family: [
    {
      kinship: { type: Number, enum: [0, 1,] },
      name: { type: String },
      profission: { type: String },
      age: { type: Number },
      isParticipant: { type: Boolean },
    }
  ],
  createdAt: { type: Date, default: Date.now }
})

ParticipantSchema.pre('save', async function (next) {
  this.cpf = this.cpf.replace(/\D/g, '');
  console.log("this.tel", this.tel)
  this.tel = this.tel.map(tel => tel.replace(/\D/g, ''))
  this.address.cep = this.address.cep.replace(/\D/g, '');
  next();
})


const User = mongoose.model('Participant', ParticipantSchema);
module.exports = User;