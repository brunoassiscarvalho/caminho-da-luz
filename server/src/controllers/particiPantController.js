const express = require('express');
const router = express.Router();
const authMidlleware = require('../middlewares/auth')

 router.use(authMidlleware)

router.get('',async (req, res) => {
    res.send("/participant")
})

router.post('/create',async (req, res) => {
    
    const user = await User.create(req.body);

    res.send("/participant")
})


module.exports = app => app.use('/participant', router)