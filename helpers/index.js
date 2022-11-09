

const dbValidators   = require('./db-validatos');
const generarJWT     = require('./generar-jwt');
const generarPremium = require('./generar-db-premium');
const generarSegunda = require('./generar-db-segunda')
const subirArchivo   = require('./db-validatos');
const coleccionVacia = require('./validar-colecciones')

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...generarPremium,
    ...subirArchivo,
    ...generarSegunda,
    ...coleccionVacia
}