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
        ref: "segundas"
    },
    idDescuento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "descuentos"
    },
    idDonacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "donacions"
    },
    idReciclaje: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reciclajes"
    },
    descuento: {
        type: String,
        required: [false]
    },  
    fecha: {
        type: String,
        required: [true]
    }, 
    puntosTotales: {
        type: Number,
        required: [false]
    }, 

    
});

module.exports = model( 'Trueque', TruequeSchema )