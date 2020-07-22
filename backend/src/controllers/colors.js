'use stric'
 
 const Color = require('../models/color');
 const connectDB = require('../database/bd');

 connectDB();

 function getColors (req,res) {
    Color.find({},(err, colores) => {
        if (err) return  res.status(500).send({message: `Error al obtener colores: ${err}`});
        if (!colores) return res.status(404).send({message: "No existen colores "});
        res.status(200).send({colores})
    })
 }



 function getColor (req,res) {
   Color.findById(req.params.id,(err, color) => {
        if (err) return  res.status(500).send({message: `Error al buscar color: ${err}`});
        if (!color) return res.status(404).send({message: "El color no existe "});
        res.status(200).send({color})
    })
}



function createColor (req, res) {

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

}


function updateColor (req,res) {
 Color.findByIdAndUpdate(req.params.id, req.body, (err, colorUpdate) => {
    if (err) return  res.status(500).send({message: `Error al actualizar color: ${err}`});
    res.status(200).send({colorUpdate})
 })
}




function deleteColor (rerq, res) {
    Color.findById(req.params.id,(err, color) => {
    if (err) return  res.status(500).send({message: `Error al borrar color: ${err}`});

    color.remove(err => {
        if (err) return  res.status(500).send({message: `Error al borrar color: ${err}`});
    })
    res.status(200).send({message : 'El color fue eliminado'})
 }) 
}


module.exports = {
    getColors,
    getColor,
    createColor,
    updateColor,
    deleteColor
}