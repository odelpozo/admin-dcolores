'use stric'
const express = require('express');
const api = express.Router();

const ColorCtrl = require('../controllers/colors');
const verify = require('../controllers/verfy');
const authotiza = require('../security/auth');


/*  api listing. */
api.get('/', (req, res) => {
    res.send('is ok api_color works this alive');
});

api.post('/api/acceso',  verify.verificaPerfil)
 
api.get('/api/colores', authotiza.accessFree, ColorCtrl.getColors)

api.get('/api/colores/:id', authotiza.accessFree, ColorCtrl.getColor)

api.delete('/api/colores/:id', authotiza.accessAdmin, ColorCtrl.deleteColor)

api.put('/api/colores/:id', authotiza.accessAdmin, ColorCtrl.updateColor)

api.post('/api/color', authotiza.accessAdmin,  ColorCtrl.createColor)

// api.get('/private', authotiza.accessAdmin,(req,res) => {
//     res.status(200).send({message:'acceso permitido con perfil ' + req.perfil})
// })

module.exports = api;