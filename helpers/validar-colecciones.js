
const PremiumUnitario   = require('../models/premiumUnitario');
const SegundaUnitario   = require('../models/segundaUnitario');
const DescuentoUnitario = require('../models/descuentoUnitario')

const coleccionVacia = (categoria) => {
    if (categoria == 'Premium') {

        return new Promise(async (resolve, reject) => {
            const objetoPremiumUnitario = await PremiumUnitario.find()
            const existenDatos = Object.entries(objetoPremiumUnitario).length === 0;
            resolve({ existenDatos })
        });
    }

    if (categoria == 'Segunda'){
        return new Promise(async (resolve, reject) => {
            const objetoSegundaUnitario = await SegundaUnitario.find()
            const existenDatos = Object.entries(objetoSegundaUnitario).length === 0;
            resolve({ existenDatos })
        });
    }

    if (categoria == 'Descuento'){
        return new Promise(async (resolve, reject) => {
            const objetoDescuentoUnitario = await DescuentoUnitario.find()
            const existenDatos = Object.entries(objetoDescuentoUnitario).length === 0;
            resolve({ existenDatos })
        });
    }

}


module.exports = {
    coleccionVacia
}

