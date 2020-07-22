'use stric'

const router = require('express').Router();
const connectDB = require('../database/bd');
const Color = require('../models/color');

connectDB();

/*  api listing. */
router.get('/', (req, res) => {
    res.send('is ok api_color works this alive');
});

 

router.get('/api/colores', (req, res) => {
     Color.find({},(err, colores) => {
        if (err) return  res.status(500).send({message: `Error al obtener colores: ${err}`});
        if (!colores) return res.status(404).send({message: "No existen colores "});
        res.status(200).send({colores})
    })
})

router.get('/api/colores/:id', (req, res) => {
 
    Color.findById(req.params.id,(err, color) => {
        if (err) return  res.status(500).send({message: `Error al buscar color: ${err}`});
        if (!color) return res.status(404).send({message: "El color no existe "});
        res.status(200).send({color})
    })
})


router.delete('/api/colores/:id', (req, res) => {
 
    Color.findById(req.params.id,(err, color) => {
        if (err) return  res.status(500).send({message: `Error al borrar color: ${err}`});

        color.remove(err => {
            if (err) return  res.status(500).send({message: `Error al borrar color: ${err}`});
        })
        res.status(200).send({message : 'El color fue eliminado'})
    })
})


router.put('/api/colores/:id', (req, res) => { 
    Color.findByIdAndUpdate(req.params.id, req.body, (err, colorUpdate) => {
        if (err) return  res.status(500).send({message: `Error al actualizar color: ${err}`});
        res.status(200).send({colorUpdate})
    })
})


router.post('/api/color', (req, res) => {
    let color = new Color();
    color.id =req.body.id,
    color.name =req.body.name,
    color.color= req.body.color,
    color.pantone =req.body.pantone,
    color.year =req.body.year  

    color.save((err, colorSt) => {
        if(err)  res.status(500).send({message: `Error al guardar color: ${err}`})
        res.status(200).send({color:colorSt})
    })
})

module.exports = router;