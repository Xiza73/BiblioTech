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


//routes
app.use('/',require('./routes/base'))
app.use('/api/claseEjemplo', require('./routes/claseEjemplo'));
app.use('/api/comentario', require('./routes/comentario'));
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/rol', require('./routes/rol'));
app.use('/api/libro', require('./routes/libro'));
app.use('/api/favorito', require('./routes/favorito'));
app.use('/api/persona', require('./routes/persona'));
//services
app.use('/auth', require('./routes/auth'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//listen to port
const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
exports.server = server