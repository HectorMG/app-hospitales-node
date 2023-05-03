require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config')
const path = require('path');

// Se crea servidor express
const app = express();

// Lectura y parseo de body
app.use(express.json());

// Configurar CORS
app.use(cors());

//Carpeta publica
app.use(express.static('app/public'));

// Conexión BD
dbConnection();

//Rutas
app.use('/api/usuarios', require('./app/routes/usuarios.routes'));
app.use('/api/hospitales', require('./app/routes/hospitales.routes'));
app.use('/api/medicos', require('./app/routes/medicos.routes'));
app.use('/api/auth', require('./app/routes/auth.routes'));
app.use('/api/busqueda', require('./app/routes/busqueda.routes'));
app.use('/api/upload', require('./app/routes/upload.routes'));



//Inicia el servicio
app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado', process.env.PORT);
});



