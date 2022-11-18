const { Schema, model, mongoose } = require('mongoose');

const ReciclajeSchema = Schema({
    idReciclajeUnitario: {
        type: mongoose.Schema.Types.ObjectId,
        // Revisar DB
        ref: ""
    },
    // Preguntar a Daniela
    cantidad: {
        type: Number,
        required: [true, 'Se necesita la cantidad de reciclaje' ]
    },  
    kilos: {
        type: Number,
        required: [true, 'Se necesitan los kilos de reciclaje']
    }, 
    
});

module.exports = model( 'Reciclaje', ReciclajeSchema )