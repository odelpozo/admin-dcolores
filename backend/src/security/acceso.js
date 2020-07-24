'use strict'
const config = require('../config/enviroment');


function administrador (req, res, next) {

    if (!req.headers.authorization){
        return res.status(403).send({message: 'Indicar nievel de acceso asociado a su perfil'})
    }

    if(req.headers.authorization != config.PERFIL_ADM){
        return res.status(403).send({message: `No tiene el nivel de permiso con el perfil ${req.headers.authorization}`})
    }

 
    req.perfil = req.headers.authorization;
    next();
}

function usuario (req, res, next) {

    if (!req.headers.authorization){
        return res.status(403).send({message: 'Indicar nievel de acceso asociado a su perfil'})
    }

    if(req.headers.authorization != config.PERFIL_USR && req.headers.authorization != config.PERFIL_ADM){
        return res.status(403).send({message: `Tienes el el nivel de permiso con el perfil  ${req.headers.authorization}`})
    }

    req.perfil = req.headers.authorization;
    next();
}


module.exports = {administrador,usuario}