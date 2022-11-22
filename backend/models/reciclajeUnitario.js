const { Schema, model } = require('mongoose');

const ReciclajeUnitarioSchema = Schema({
    deuda: {
        type: Number,
        required: [false, 'Valor deuda obligatorio']
    },
    prenda: {
        type: String,
        default: 'hilado textil'
    }
        
});

module.exports = model( 'ReciclajeUnitario', ReciclajeUnitarioSchema )