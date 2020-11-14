const express = require('express');
const User = require('../model/user')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { sendMail } = require('../email/mailController');


router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(400).send({ error: "Usuário não encontrado!" })

  if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: "Senha Inválida!" })

  const token = generateToken({ id: user.id })
  user.password = undefined;

  res.send({ user, token })

})

router.post('/reset-password', async (req, res) => {
  const { email } = req.body  
  try {
    const pass = Math.random().toString(36).slice(-8)
    const user = await User.findOneAndUpdate(
      { email },
      { $set: {password:pass, status: 5}},
      { new: true }
    )
    sendMail(user.email, pass);
    user.password = undefined;
    return res.send({ user })
  } catch (err) {
    console.log("errr", err);
    return res.status(400).send({ error: "Não foi possível fazer uma nova senha" })
  }
})

function generateToken(params = {}) {
  return jwt.sign(params, process.env.DATA_MODE, { expiresIn: 30000 })
}

module.exports = app => app.use('/auth', router)