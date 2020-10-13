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
        console.log(req.body)
        const participant = await Paricipant.create(req.body);
        return res.send(participant)
    }catch(err){
        console.log(err)
        if(err.code===11000) res.status(400).send({ error: "Não foi possível prosseguir. Participante já cadastrado" })
        else res.status(400).send({ error: "Não foi possível cadastrar o participante" })      
    }
})


router.put('/update', async (req, res) => {
    const {_id} = req.body;
    try{
        const participant = await Paricipant.findOneAndUpdate({_id},req.body, {returnNewDocument : true});
        return res.send(participant)
    }catch(err){
        res.status(400).send({ error: "Não foi possível atualizar o participante" })      
    }
})


router.get('/list', async (req, res) => {
    try{
        const participants = await Paricipant.find();
        return res.send(participants)
    }catch(err){
        res.status(400).send({ error: "Não foi possível cadastrar o participante" })      
    }
    if (!participants || participants.length<1) return res.status(400).send({ error: "Sem participants cadastrados" })

})

router.get('/detail', async (req, res) => {
    try{
        const {id} = req.query;
        const participant = await Paricipant.findOne({_id:id});
        return res.send(participant)
    }catch(err){
        res.status(400).send({ error: "Erro ao tentar encontrar o participante" })      
    }
    if (!participants) return res.status(400).send({ error: "Participante não encontrado" })

})




module.exports = app => app.use('/participant', router)