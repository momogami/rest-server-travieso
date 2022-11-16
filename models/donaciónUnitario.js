const { Schema, model } = require('mongoose');

const DonacionUnitarioSchema = Schema({
    ropa: {
        type: String,
        required: [true, 'Dato Ropa Obligatorio']
    },
      
});

module.exports = model( 'DonacionUnitario', DonacionUnitarioSchema )