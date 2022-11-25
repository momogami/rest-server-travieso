const { Schema, model, mongoose } = require('mongoose');

const DetalleSchema = Schema({
    tipoRopa: {
        type: String,
        required: [false],
        enum: ['PREMIUM', 'SEGUNDA','RECICLAJE','DESCUENTO','DONACION'],
    },
    ropa: {
        type: String,
        required: [false]
    },
    talla: {
        type: String,
        required: [false]
    },  
    puntos: {
        type: Number,
        required: [false]
    },
    deuda: {
        type: Number,
        required: [false]
    }
    
});

module.exports = model( 'Detalle', DetalleSchema )