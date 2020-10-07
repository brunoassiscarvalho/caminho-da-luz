const mongoose = require('../database');
const bcrypt = require('bcryptjs') 

const UserSchema = new mongoose.Schema({
    name:{type: String, require: true },
    cpf:{type: Number, require: true, unique: true, },
    birthDate:{type: Date},
    civilState: {type: Number},
    originState: {type: String},
    originCity: {type: String},
    createdAt:{type: Date, default: Date.now }
})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User;