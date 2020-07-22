'use strict'

const userMdl = require('../models/user');
const connectDB = require('../database/bd');

connectDB();

function obtienePerfil (req, res) {
    userMdl.find({user: req.body.user}, (err, user) => {
        if (err) return res.status(500).send('message', err)
        if(!user) return res.status(404).send('message', 'Usuario, no existe')

        req.user = user
        res.status(200).send({ user })
    })
}


module.exports = {obtienePerfil}