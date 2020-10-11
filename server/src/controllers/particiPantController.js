const express = require('express');
const router = express.Router();
const authMidlleware = require('../middlewares/auth');
const Paricipant = require('../model/participant');

router.use(authMidlleware)

router.get('', async (req, res) => {
    res.send("/participant")
})

router.post('/create', async (req, res) => {

    try{
        const participant = await Paricipant.create(req.body, );
        return res.send(participant)
    }catch(err){
        console.log("erro mongo",err)
        if(err.code===11000) res.status(400).send({ error: "Não foi possível prosseguir. Participante já cadastrado" })
        else res.status(400).send({ error: "Não foi possível cadastrar o participante" })      
    }

    // if (!user) return res.status(400).send({ error: "Não foi possível cadastrar o participante" })

})


router.get('/list', async (req, res) => {
    try{
        const participants = await Paricipant.find();
        return res.send(participants)
    }catch(err){
        // console.log("erro mongo",err)
        // if(err.code===11000) res.status(400).send({ error: "Não foi possível prosseguir. Participante já cadastrado" })
        // else 
        res.status(400).send({ error: "Não foi possível cadastrar o participante" })      
    }

    // if (!user) return res.status(400).send({ error: "Não foi possível cadastrar o participante" })

})


module.exports = app => app.use('/participant', router)