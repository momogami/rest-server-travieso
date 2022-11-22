const { Schema, model } = require('mongoose');

const SegundaUnitarioSchema = Schema({
    ropa: {
        type: String,
        required: [true, 'Ropa Obligatoria']
    },
    puntos: {
        type: String,
        required: [false, 'Valor puntos obligatorio']
    },
        
});

module.exports = model( 'SegundaUnitario', SegundaUnitarioSchema )