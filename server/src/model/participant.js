const mongoose = require('../database');
// const bcrypt = require('bcryptjs') 

const ParticipantSchema = new mongoose.Schema({
    name: { type: String, require: true },
    cpf: { type: Number, require: true, unique: true, },
    profession: { type: String },
    birthDate: { type: Date },
    civilState: { type: Number },
    originState: { type: String },
    originCity: { type: String },
    address: {
        cep: { type: Number },
        neighbor: { type: String },
        street: { type: String },
        number: { type: String },
        complement: { type: String },
    },
    tel: { type: [Number] },
    family: [
        {
            parentesco: { type: Number, enum: [0, 1,] },
            name: { type: String },
            profission: { type: String},
            age: { type: Number },
            isParticipant: { type: Boolean },
        }
    ],
    createdAt: { type: Date, default: Date.now }
})


const User = mongoose.model('Participant', ParticipantSchema);
module.exports = User;