const { Schema, model } = require('mongoose');

const ReciclajeUnitarioSchema = Schema({
    deuda: {
        type: String,
        required: [false, 'Valor deuda obligatorio']
    },
        
});

module.exports = model( 'ReciclajeUnitario', ReciclajeUnitarioSchema )