const { Schema, model, mongoose } = require('mongoose');

const DescuentoSchema = Schema({
    idDescuentoUnitario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "descuentounitarios"
    },
    cantidad: {
        type: Number,
        required: [false]
    },  
    
});

module.exports = model( 'Descuento', DescuentoSchema )