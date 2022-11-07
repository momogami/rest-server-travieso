const { Schema, model } = require('mongoose');

const SegundaUnitarioSchema = Schema({
    ropa: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    puntos: {
        type: String,
        required: [false, 'El Rut es obligatorio']
    },
        
});

module.exports = model( 'SegundaUnitario', SegundaUnitarioSchema )