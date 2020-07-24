'use strict'

const userMdl = require('../models/user');

function obtienePerfil (req, res) {
    userMdl.find({user: req.body.user}, (err, user) => {
        if (err) return res.status(500).send('message', err)

        req.user = user
        res.status(200).send({ user })
    })
}


module.exports = {obtienePerfil}