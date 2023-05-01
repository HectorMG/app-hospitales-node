const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conexión bd correcta');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la bd', error);
    }
}

module.exports = {
    dbConnection
}