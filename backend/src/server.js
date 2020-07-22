'use stric'

const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();

// conf
app.set('port', process.env.PORT || 7000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));



// routes
app.use(require('./routes/routes'));


app.use(express.static(path.join(__dirname,'dist/seeker')))

app.listen(app.get('port'), () => {
    console.log('escuchando en puerto ' + app.get('port'));
})


module.exports = app; 