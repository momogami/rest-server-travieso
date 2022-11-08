const { Schema, model } = require('mongoose');

const reciclajeUnitarioSchema = Schema({
    deuda: {
        type: String,
        required: [false, 'Valor puntos obligatorio']
    },
        
});

module.exports = model( 'reciclajeUnitario', reciclajeUnitarioSchema )