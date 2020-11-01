const express = require('express');
const router = express.Router();
const authMidlleware = require('../middlewares/auth');
const Event = require('../model/event');

router.use(authMidlleware)


router.post('/create', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    return res.send(event)
  } catch (err) {
    console.log(err)
    if (err.code === 11000) res.status(400).send({ error: "Não foi possível prosseguir. Evento já cadastrado" })
    else res.status(400).send({ error: "Não foi possível cadastrar o evento" })
  }
})


router.put('/update', async (req, res) => {
  const { _id } = req.body;
  try {
    const event = await Event.findOneAndUpdate({ _id }, req.body, { returnNewDocument: true });
    return res.send(event)
  } catch (err) {
    res.status(400).send({ error: "Não foi possível atualizar o participante" })
  }
})

router.get('/detail', async (req, res) => {
  try {
    const { id } = req.query;
    const event = await Event.findOne({ _id: id });
    return res.send(event)
  } catch (err) {
    res.status(400).send({ error: "Erro ao tentar encontrar o participante" })
  }
  if (!event) return res.status(400).send({ error: "Participante não encontrado" })
})

router.get('/list', async (req, res) => {
  try {
    const event = await Event.find(req.query);
    return res.send(event)
  } catch (err) {
    res.status(400).send({ error: "Erro ao tentar encontrar os Eventos" })
  }
  if (!event) return res.status(400).send({ error: "Participante não encontrado" })
})

router.get('/list/inactive', async (req, res) => {
  try {
    const event = await Event.find({...req.query, closeDate: {$exists:true}});
    return res.send(event)
  } catch (err) {
    res.status(400).send({ error: "Erro ao tentar encontrar o participante" })
  }
  if (!participants) return res.status(400).send({ error: "Participante não encontrado" })
})

router.put('/close', async (req, res) => {
  try {
    const { id } = req.query;
    const event = await Event.findOne({ _id: id });
    return res.send(event)
  } catch (err) {
    res.status(400).send({ error: "Erro ao tentar encontrar o participante" })
  }
  if (!event) return res.status(400).send({ error: "Participante não encontrado" })

})


module.exports = app => app.use('/event', router)