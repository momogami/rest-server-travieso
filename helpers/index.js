

const dbValidators   = require('./db-validatos');
const generarJWT     = require('./generar-jwt');
const generarPremium = require('./generar-db-premium');
const subirArchivo   = require('./db-validatos');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...generarPremium,
    ...subirArchivo
}