const mongoose = require('../database');
// const bcrypt = require('bcryptjs') 

const ParticipantSchema = new mongoose.Schema({
    name:{type: String, require: true },
    cpf:{type: Number, require: true, unique: true, },
    // birthDate:{type: Date},
    // civilState: {type: Number},
    originState: {type: String},
    originCity: {type: String},
    createdAt:{type: Date, default: Date.now }
})

// ParticipantSchema.pre('save', async function(next){
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
//     next();
// })

const User = mongoose.model('Participant', ParticipantSchema);
module.exports = User;