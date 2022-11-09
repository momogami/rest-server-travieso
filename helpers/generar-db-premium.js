
const PremiumUnitario = require('../models/premiumUnitario');

//Recibe los datos de la Conversión de Excel a Json
const generarPremium = ( datos = '' ) => {

    const salida = []; // pa guardar las vainas procesadas
    
    datos.forEach(dato => {
        //Muestra el dato en el que se situa ahora
        /* console.log('iterando en', dato); */

        //Paseo por keys de un objeto
        for (const [key, value] of Object.entries(dato)) {
            if (key == '__EMPTY') continue;

            /* console.log(`Valores actuales ${key}: ${value}`) */
            
            const realg4life = {
                ropa: dato['__EMPTY'],
                talla: key,
                puntos: value,
            }

            /* console.log(realg4life) */
            const {talla, puntos, ropa} = realg4life
            const premiumUnitario = new PremiumUnitario({talla, puntos, ropa})
            premiumUnitario.save()
            salida.push(realg4life)


        }
    });
    
}

module.exports = {
    generarPremium
}