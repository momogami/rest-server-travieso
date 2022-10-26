
const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    rut: {
        type: String,
        required: [true, 'El Rut es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    celular: {
        type: String,
        required: [true, 'El número de Celular es Obligatorio']
    }
    
    
});

module.exports = model( 'Cliente', ClienteSchema )