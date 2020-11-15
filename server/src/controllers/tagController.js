const express = require('express');
const router = express.Router();
const {validateToken, validateUserActive} = require('../middlewares/auth');
const Tag = require('../model/tag');

router.use(validateToken, validateUserActive)

router.get('', async (req, res) => {
    res.send("/tag")
})

router.post('/create', async (req, res) => {

    try{
        const tag = await Tag.create(req.body);
        return res.send(tag)
    }catch(err){
        if(err.code===11000) res.status(400).send({ error: "Não foi possível prosseguir. Participante já cadastrado" })
        else res.status(400).send({ error: "Não foi possível cadastrar o participante" })      
    }
})


router.put('/update', async (req, res) => {
    const {_id} = req.body;
    try{
        const tag = await Tag.findOneAndUpdate({_id},req.body, {returnNewDocument : true});
        return res.send(tag)
    }catch(err){
        res.status(400).send({ error: "Não foi possível atualizar o participante" })      
    }
})


router.get('/list', async (req, res) => {
    try{
        const tag = await Tag.find();
        return res.send(tag)
    }catch(err){
        res.status(400).send({ error: "Não foi possível cadastrar o participante" })      
    }
    if (!tag || tag.length<1) return res.status(400).send({ error: "Sem tag cadastrados" })

})

router.get('/detail', async (req, res) => {
    try{
        const {id} = req.query;
        const tag = await Tag.findOne({_id:id});
        return res.send(tag)
    }catch(err){
        res.status(400).send({ error: "Erro ao tentar encontrar o participante" })      
    }
    if (!tag) return res.status(400).send({ error: "Participante não encontrado" })
})

router.delete('/exclude',async (req, res) => {
  try{
      const {id} = req.body;
      const tag = await Tag.findOneAndDelete({_id:id});
      return res.send(tag)
  }catch(err){
      res.status(400).send({ error: "Erro ao tentar encontrar o participante" })      
  }
  if (!tag) return res.status(400).send({ error: "Participante não encontrado" })
})

module.exports = app => app.use('/tag', router)