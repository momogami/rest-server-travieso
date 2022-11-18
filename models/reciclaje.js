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
        required: [false, 'Se necesita la cantidad de reciclaje' ]
    },  
    kilos: {
        type: Number,
        required: [false, 'Se necesitan los kilos de reciclaje']
    }, 
    
});

module.exports = model( 'Reciclaje', ReciclajeSchema )