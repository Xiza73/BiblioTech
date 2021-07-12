//libraries
const express = require('express');
const morgan = require('morgan'); //ver por consola las peticiones q se hagan
const path = require('path');
const cors = require('cors');

const { mongoose } = require('./database');

//methods of libs
const app = express();
require('dotenv').config();

//settings
app.set('port', process.env.PORT || 5000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//database

//routes
app.use('/api/claseEjemplo', require('./routes/claseEjemplo'));
//app.use('/api/usuario', require('./routes/usuario'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//listen to port
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})