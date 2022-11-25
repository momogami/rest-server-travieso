const { Schema, model, mongoose } = require('mongoose');

const TruequeDetalleSchema = Schema({
    idDetalle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "detalles"
    },
    cantidad: {
        type: Number,
        required: [false]
    },  
    puntosIniciales: {
        type: Number,
        required: [false]
    },
    kilos: {
        type: Number,
        required: [false]
    },
    deudaInicial: {
        type: Number,
        required: [false]
    }

    
});

module.exports = model( 'TruequeDetalle', TruequeDetalleSchema )