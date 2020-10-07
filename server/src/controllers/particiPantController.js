const express = require('express');
const router = express.Router();
const authMidlleware = require('../middlewares/auth');
const Paricipant = require('../model/participant');

//  router.use(authMidlleware)

router.get('',async (req, res) => {
    res.send("/participant")
})

router.post('/create',async (req, res) => {
    
    const user = await Paricipant.create(req.body);

    res.send(user)
})


module.exports = app => app.use('/participant', router)