const { Schema, model, mongoose } = require('mongoose');

const SegundaSchema = Schema({
    idSegundaUnitario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "segundaunitarios"
    },
    cantidad: {
        type: Number,
        required: [false]
    },  
    puntosTotales: {
        type: Number,
        required: [false]
    },  
    
});

module.exports = model( 'Segunda', SegundaSchema )