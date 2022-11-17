const { Schema, model, mongoose } = require('mongoose');

const PremiumSchema = Schema({
    idPremiumUnitario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "premiumsunitarios"
    },
    cantidad: {
        type: Number,
        required: [false]
    },  
    puntosTotales: {
        type: Number,
        required: [false]
    },  
    
});

module.exports = model( 'Premium', PremiumSchema )