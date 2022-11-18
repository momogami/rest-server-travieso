const { Schema, model, mongoose } = require('mongoose');

const TruequeSchema = Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios"
    },
    idCliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clientes"
    },
    idPremium: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "premia"
    },
    idSegunda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios"
    },
    idDescuento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios"
    },
    idDonacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios"
    },
    idReciclaje: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios"
    },
    descuento: {
        type: String,
        required: [false]
    },  
    fecha: {
        type: Date,
        required: [true]
    }, 
    puntosTotales: {
        type: Number,
        required: [false]
    }, 

    
});

module.exports = model( 'Trueque', TruequeSchema )