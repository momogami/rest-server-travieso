const { Schema, model } = require('mongoose');

const DescuentoUnitarioSchema = Schema({
    ropa: {
        type: String,
        required: [true, 'Dato ropa obligatorio']
    },
      
});

module.exports = model( 'DescuentoUnitario', DescuentoUnitarioSchema )