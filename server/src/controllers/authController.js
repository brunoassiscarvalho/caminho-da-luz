const express = require('express');
const User = require('../model/user')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auhtConfig = require('../config/auth')

router.post('/register', async (req, res) => {
    const { email } = req.body
    try {
        if (await User.findOne({ email })) return res.status(400).send({ error: "Email já cadastrado" })
        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({ user })
    } catch (err) {
        return res.status(400).send({ error: "registratio failed" })
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password');

    if (!user) return res.status(400).send({ error: "Usuário não encontrado!" })

    if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: "Senha Inválida!" })

    user.password = undefined;
    const token = generateToken({id: user.id})

    res.send({ user, token })

})

function generateToken(params ={}){
    return jwt.sign(params, auhtConfig.secret, {expiresIn: 30000})
}

module.exports = app => app.use('/auth', router)