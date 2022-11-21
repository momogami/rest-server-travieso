
const Trueque            = require('../models/trueque');
const Premium            = require('../models/premium');
const PremiumUnitario    = require('../models/premiumUnitario');
const Segunda            = require('../models/segunda');
const SegundaUnitario    = require('../models/segundaUnitario');
const Donacion           = require('../models/donación');
const DonacionUnitario   = require('../models/donaciónUnitario')
const DescuentoUnitario  = require('../models/descuentoUnitario');
const Reciclaje          = require('../models/reciclaje');
const ReciclajeUnitario  = require('../models/reciclajeUnitario');
const Descuento          = require('../models/descuento');
const Usuario            = require('../models/usuario');
const Cliente            = require('../models/cliente');



const obtenerJsonTrueque = async(idTrueque) => {

    const trueque = await Trueque.findById( idTrueque )

    const jsonPremiumFinal = [];
    var   cantidadPremium = 0;
    

    trueque.idPremium.forEach ( async idPremium => {

        const premium = await Premium.findById( idPremium );

        const premiumUnitario = await PremiumUnitario.findById( premium.idPremiumUnitario );

        console.log( premiumUnitario )

        const jsonPremium = {
            ropa:   premiumUnitario.ropa,
            talla:  premiumUnitario.talla
        }

        jsonPremiumFinal.push( jsonPremium )
        console.log(jsonPremiumFinal)
        return jsonPremiumFinal
    });

    



    

    
    
        


}





module.exports = {
    obtenerJsonTrueque
}