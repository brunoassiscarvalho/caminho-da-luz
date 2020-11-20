const express = require('express');
const User = require('../model/user')
const router = express.Router();
const {validateToken, validateUserActive} = require('../middlewares/auth');
const { sendMail } = require('../email/mailController');

router.post('/register',validateToken,validateUserActive, async (req, res) => {
  const { email } = req.body
  try {
    if (await User.findOne({ email })) return res.status(400).send({ error: "Email já cadastrado" })
    const pass = Math.random().toString(36).slice(-8)
    const user = await User.create({ email: email, password: pass, status: 0 })
    sendMail(user.email, pass.password);
    // user.password = undefined;
    user.password = pass;
    return res.send({ user })
  } catch (err) {
    return res.status(400).send({ error: "Não foi possível criar um novo usuário" })
  }
})

router.post('/validate-user',validateToken, async (req, res) => {
  const { email, password, name } = req.body
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { name: name, password: password, status: 10 } },
      { new: true }
    )
    user.password = undefined;
    return res.send({ user })
  } catch (err) {
    return res.status(400).send({ error: "Não foi possível mudar a senha" })
  }
})

router.post('/change-pass',validateToken, async (req, res) => {
  const { password } = req.body
  const _id = req.user._id;
  try {
    const user = await User.findOneAndUpdate(
      { _id },
      { $set: { password: password, status: 10 } },
      { new: true }
    )
    user.password = undefined;
    return res.send({ user })
  } catch (err) {
    return res.status(400).send({ error: "Não foi possível mudar a senha" })
  }
})

router.post('/new-pass',validateToken,validateUserActive, async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({email})
  if (!user) return res.status(403).send({ error: "Autorização inválida!" })
  const status = user.status == 0 ? 0 : 5;
  try {
    const pass = Math.random().toString(36).slice(-8)
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { password: pass, status: status } },
      { new: true }
    )    
    updatedUser.password = pass;
    return res.send({ updatedUser })
  } catch (err) {
    console.log("errr", err);
    return res.status(400).send({ error: "Não foi possível fazer uma nova senha" })
  }
})

router.post('/reset-password', async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({email})
  if (!user) return res.status(403).send({ error: "Autorização inválida!" })
  const status = user.status == 0 ? 0 : 5;
  try {
    const pass = Math.random().toString(36).slice(-8)
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { password: pass, status: status } },
      { new: true }
    )
    sendMail(updatedUser.email, pass);
    updatedUser.password = undefined;
    return res.send({ updatedUser })
  } catch (err) {
    console.log("errr", err);
    return res.status(400).send({ error: "Não foi possível fazer uma nova senha" })
  }
})

module.exports = app => app.use('/user', router)