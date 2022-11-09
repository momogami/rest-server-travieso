
const SegundaUnitario = require('../models/segundaUnitario');

const generarSegunda = (datos = '') => {


    datos.forEach(datos => {

        const realg4life = {
            ropa: datos.Prenda,
            puntos: datos.Puntos,
        }

        const { ropa, puntos } = realg4life
        const segundaUnitario = new SegundaUnitario({ ropa, puntos })
        segundaUnitario.save()

    });

}

module.exports = {
    generarSegunda
}