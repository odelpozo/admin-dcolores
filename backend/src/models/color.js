'use strict'

const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
    // _id: {type: Object, required: false},
    id : { type: Number, required: true },
    name : { type: String, required: true },
    color : { type: String, required: true },
    pantone : { type: String, required: true },
    year : { type: Number, required: true } 
}, { versionKey: false });

 

module.exports = mongoose.model('Color', ColorSchema)