const mongoose = require('mongoose')
const config = require('../config/enviroment');

module.exports = function connect() {
 
 
const USER = encodeURIComponent(config.MONGO_USR);
const PASS = encodeURIComponent(config.MONGO_PASS);

let uri = `mongodb://${config.MONGO_URI}/${config.MONGO_DB}` 
console.log('uri', uri);

mongoose.connect(uri, {
    socketTimeoutMS: 1000,
    useNewUrlParser: true,
    keepAlive: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open',() => {
    console.log('conectado a MongoDB');

}).on('error',(error) => {
    console.log('Error al conectamrme al MongoDB', JSON.stringify(error,null, 2));
    process.exit();
});

}