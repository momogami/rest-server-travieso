
const SegundaUnitario = require('../models/segundaUnitario');

const generarSegunda = (datos = '') => {

    const salida = []; // pa guardar las vainas procesadas

    datos.forEach(datos => {

        const realg4life = {
            ropa: datos.Prenda,
            puntos: datos.Puntos,
        }

        const { ropa, puntos } = realg4life
        const segundaUnitario = new SegundaUnitario({ ropa, puntos })
        segundaUnitario.save()
        salida.push(realg4life)

    });

}

module.exports = {
    generarSegunda
}