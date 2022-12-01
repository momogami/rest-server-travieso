
const Detalle         = require('../models/detalle')

//Recibe los datos de la Conversión de Excel a Json
const generarPremium = ( datos = '' ) => {
    
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
            const detalle = new Detalle({tipoRopa: 'PREMIUM', talla: talla, puntos: puntos, ropa: ropa, deuda: null, })
            detalle.save()
            
        }
    });
    
}

module.exports = {
    generarPremium
}