
const SegundaUnitario = require('../models/segundaUnitario');
const Detalle         = require('../models/detalle')

const generarSegunda = (datos = '') => {


    datos.forEach(dato => {
        console.log(dato)
        const realg4life = {
            ropa: dato.Prenda,
            puntos: dato.Puntos,
        }

        const { ropa, puntos } = realg4life
        const detalle = new Detalle({tipoRopa: 'Segunda', talla: talla, puntos: puntos, ropa: ropa, deuda: null, })
        /* detalle.save() */

    });

}

module.exports = {
    generarSegunda
}