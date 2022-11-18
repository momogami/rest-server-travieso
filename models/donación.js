const { Schema, model, mongoose } = require('mongoose');

const DonacionSchema = Schema({
    idDonacionUnitario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    },
    cantidad: {
        type: Number,
        required: [false]
    },  
    
});

module.exports = model( 'Donacion', DonacionSchema )