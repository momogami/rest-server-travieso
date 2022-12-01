
const Detalle         = require('../models/detalle')

const coleccionesVacias = async(  ) => {

    // PREMIUM
    const premiums = await Detalle.find({tipoRopa: 'PREMIUM'});
    const vacioPremium = Object.entries(premiums).length === 0;

    //SEGUNDA
    const segundas = await Detalle.find({tipoRopa:'SEGUNDA'})
    const vacioSegunda = Object.entries(segundas).length === 0;

    //DESCUENTO
    const descuentos = await Detalle.find({tipoRopa: 'DESCUENTO'}) 
    const vacioDescuentos = Object.entries(descuentos).length === 0;

    //DONACION
    const donacion = await Detalle.find({tipoRopa: 'DESCUENTO'})
    const vacioDonacion = Object.entries(donacion).length === 0;    
    
    //RECICLAJE 
    const reciclaje = await Detalle.find({tipoRopa: 'DESCUENTO'})
    const vacioReciclaje = Object.entries(reciclaje).length === 0;    

    if( vacioPremium && vacioSegunda && vacioDescuentos && vacioDonacion && vacioReciclaje == true ){
        return true
    }

    return false
}


module.exports = {
    coleccionesVacias
}