'use stric'
const express = require('express');
const api = express.Router();

const ColorCtrl = require('../controllers/colors');
const perfiles = require('../controllers/perfiles');
const acceso = require('../security/acceso');


/*  api listing. */
api.get('/', (req, res) => {
    res.send('is ok api_color works this alive');
});


// usuario
api.post('/api/acceso',  perfiles.obtienePerfil)


// color crud
 
api.get('/api/colores/:pag?*', acceso.usuario, ColorCtrl.getColors)  

api.get('/api/color/:id', acceso.usuario, ColorCtrl.getColor) 

api.delete('/api/colores/:id',acceso.administrador, ColorCtrl.deleteColor) 

api.put('/api/colores', acceso.administrador, ColorCtrl.updateColor)  

api.post('/api/color',acceso.administrador,  ColorCtrl.createColor)  

 

module.exports = api;