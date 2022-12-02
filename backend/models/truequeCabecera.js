const { Schema, model, mongoose } = require('mongoose');

const TruequeCabeceraSchema = Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: [false]
    },
    idCliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clientes"
    },
    idsTruequeDetalle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "truequedetalles"
    }],
    descuento: {
        type: Number,
        required: [false]
    },  
    fecha: {
        type: Date,
        required: [true],
    }, 
    puntosTotales: {
        type: Number,
        required: [false]
    },
    deudaTotal: {
        type: Number,
        required: [false]
    },

    
});

module.exports = model( 'TruequeCabecera', TruequeCabeceraSchema )