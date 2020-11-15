const mongoose = require('../database');
const moment = require('moment')
moment.locale('pt-br');

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
  events: [
    {
      kind: { type: Number, enum: [0] },
      date: { type: Date },
    }
  ],
  createdAt: { type: Date, default: Date.now }
})

ParticipantSchema.pre('save', async function (next) {
  this.cpf = this.cpf.replace(/\D/g, '');
  console.log("this.tel", this.tel)
  if (this.tel) this.tel = this.tel.map(tel => tel.replace(/\D/g, ''))
  if (this.address?.cep) this.address.cep = this.address.cep.replace(/\D/g, '');
  next();
})

// ParticipantSchema.post('find', function(result) {

//   // console.log(this instanceof mongoose.Query); // true
//   console.log('find() returned ' + JSON.stringify(result));
//   if(Array.isArray(result)){
//     const newResult = result.map((data)=>{
//       console.log("new date", moment(data.birthDate).format('L'))
//       if (data.birthDate) data.birthDate = moment(data.birthDate).format('L')
//       return data
//     })
//     console.log("newResult array", JSON.stringify(newResult))
//     return newResult
//   }else{
//     if (result.birthDate) result.birthDate = moment(result.birthDate).format('L');
//     console.log("newResult", JSON.stringify(result))
//     return result
//   }
//   // // prints returned documents
//   // // prints number of milliseconds the query took
//   // console.log('find() took ' + (Date.now() - this.start) + ' millis');
// });


const Participant = mongoose.model('Participant', ParticipantSchema);
module.exports = Participant;