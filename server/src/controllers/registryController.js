const express = require('express');
const router = express.Router();
const authMidlleware = require('../middlewares/auth');
const Registry = require('../model/registry');
const Event = require('../model/event');
const ObjectID  = require('mongodb').ObjectID

router.use(authMidlleware)


router.post('/create', async (req, res) => {
  console.log("create event registre", req.body)
  try {
    const { event } = req.body
    const qtdRegistry = await Registry.countDocuments({ event })
    const eventItem = await Event.findOne({ _id: event })
    console.log("qtdRegistry < eventItem.capacity",qtdRegistry < eventItem.capacity)
    if (qtdRegistry < eventItem.capacity) {
      const registry = await Registry.create(req.body);
      return res.send(registry)
    } else {
      throw "excedLimit"
    }
  } catch (err) {
    console.log(err)
    if (err.code === 11000) res.status(400).send({ error: "Esta pessoa ja está registrada neste evento" })
    else if (err === "excedLimit") res.status(400).send({ error: "Numero de participantes excedido" })
    else res.status(400).send({ error: "Não foi possível registrar a participação" })
  }
})


router.put('/update', async (req, res) => {
  const { _id } = req.body;
  try {
    const registry = await Registry.findOneAndUpdate({ _id }, req.body, { returnNewDocument: true });
    return res.send(registry)
  } catch (err) {
    res.status(400).send({ error: "Não foi possível atualizar o participante" })
  }
})


router.get('/list-by-event', async (req, res) => {
  try {
    const registry = await Registry.find();
    return res.send(registry)
  } catch (err) {
    res.status(400).send({ error: "Não foi possível cadastrar o participante" })
  }
  if (!registry || registry.length < 1) return res.status(400).send({ error: "Sem registry cadastrados" })

})

router.get('/event/participants', async (req, res) => {
  try {
    const {event}=req.query

    const query = [
      {
        $match:{event:new ObjectID(event)}
      },
      {
        $lookup:
        {
          from: 'participants',
          localField: 'participant',
          foreignField: '_id',
          as: "participant"
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [ "$$ROOT",{ $arrayElemAt: ["$participant", 0] }] } }
      },   
      
    ]
    const registry = await Registry.aggregate(query);


    return res.send(registry)
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: "Não foi possível acessar os registros" })
  }
  if (!registry || registry.length < 1) return res.status(400).send({ error: "Sem registros cadastrados" })

})

router.get('/detail', async (req, res) => {
  try {
    const { id } = req.query;
    const registry = await Registry.findOne({ _id: id });
    return res.send(registry)
  } catch (err) {
    res.status(400).send({ error: "Erro ao tentar encontrar o participante" })
  }
  if (!registry) return res.status(400).send({ error: "Participante não encontrado" })
})

router.delete('/exclude', async (req, res) => {
  try {
    const { id } = req.body;
    const registry = await Registry.findOneAndDelete({ _id: id });
    return res.send(registry)
  } catch (err) {
    res.status(400).send({ error: "Erro ao tentar encontrar o participante" })
  }
  if (!registry) return res.status(400).send({ error: "Participante não encontrado" })
})

module.exports = app => app.use('/registry', router)