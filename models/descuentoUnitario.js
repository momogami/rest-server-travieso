const { Schema, model } = require('mongoose');

const DescuentoUnitarioSchema = Schema({
    ropa: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
      
});

module.exports = model( 'DescuentoUnitario', DescuentoUnitarioSchema )