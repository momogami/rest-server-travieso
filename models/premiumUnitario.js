const { Schema, model } = require('mongoose');

const PremiumUnitarioSchema = Schema({
    talla: {
        type: String,
        required: [true, 'La Talla es obligatorio']
    },
    ropa: {
        type: String,
        required: [false, 'Dato de ropa es obligatorio']
    },
    puntos: {
        type: String,
        required: [false, 'El Dato punto es obligatorio']
    },
    
    
    
    
});

module.exports = model( 'PremiumUnitario', PremiumUnitarioSchema )