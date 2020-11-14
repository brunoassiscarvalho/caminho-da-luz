const express = require('express');
const User = require('../model/user')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(400).send({ error: "Usuário não encontrado!" })

  if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: "Senha Inválida!" })

  user.password = undefined;
  const token = generateToken({ id: user.id })

  res.send({ user, token })

})

function generateToken(params = {}) {
  return jwt.sign(params, process.env.DATA_MODE, { expiresIn: 30000 })
}

module.exports = app => app.use('/auth', router)