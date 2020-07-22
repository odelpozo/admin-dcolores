'use strict'

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id : { type: Number, required: true },
    user : { type: String, required: true },
    perfil : { type: String, required: true }
}, { versionKey: false });

 

module.exports = mongoose.model('User', UserSchema)