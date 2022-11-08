const { Schema, model } = require('mongoose');

const DonacionUnitarioSchema = Schema({
    ropa: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
      
});

module.exports = model( 'DonacionUnitario', DonacionUnitarioSchema )