const express = require('express');
const User = require('../model/user')
const router = express.Router();
const authMidlleware = require('../middlewares/auth');
const { sendMail } = require('../email/mailController');

router.use(authMidlleware)

router.post('/register', async (req, res) => {
  const { email } = req.body
  try {
    if (await User.findOne({ email })) return res.status(400).send({ error: "Email já cadastrado" })
    const pass = createNewPass();
    const user = await User.create({ email, ...pass })
    sendMail(user.email, pass.password);
    user.password = undefined;
    return res.send({ user })
  } catch (err) {
    return res.status(400).send({ error: "Não foi possível criar um novo usuário" })
  }
})

router.post('/change-pass', async (req, res) => {
  const { password } = req.body
  const _id = req.userId;
  try {
    const user = await User.findOneAndUpdate(
      { _id },
      { $set: { password: password, temporaryPass: false } },
      { new: true }
    )
    user.password = undefined;
    return res.send({ user })
  } catch (err) {
    return res.status(400).send({ error: "Não foi possível mudar a senha" })
  }
})

router.post('/reset-password', async (req, res) => {
  const { email } = req.body  
  try {
    const pass = createNewPass();
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { ...pass } },
      { new: true }
    )
    sendMail(user.email, pass.password);
    user.password = undefined;
    return res.send({ user })
  } catch (err) {
    return res.status(400).send({ error: "Não foi possível fazer uma nova senha" })
  }
})

const createNewPass = () => {
  const pass = Math.random().toString(36).slice(-8)
  const user = {
    password: pass,
    temporaryPass: true
  }
  return user;
}

module.exports = app => app.use('/user', router)