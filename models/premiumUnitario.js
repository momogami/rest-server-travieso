const { Schema, model } = require('mongoose');

const PremiumUnitarioSchema = Schema({
    talla: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    ropa: {
        type: String,
        required: [false, 'El apellido es obligatorio']
    },
    puntos: {
        type: String,
        required: [false, 'El Rut es obligatorio']
    },
    
    
    
    
});

module.exports = model( 'PremiumUnitario', PremiumUnitarioSchema )