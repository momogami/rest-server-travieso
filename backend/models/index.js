
const Usuario           = require('../models/usuario');
const Role              = require('../models/role');
const Cliente           = require('../models/cliente');
const TruequeCabecera   = require('../models/truequeCabecera');
const TruequeDetalle    = require('../models/truequeDetalle');
const Detalle           = require('../models/detalle');


module.exports = {
    ...Usuario,
    ...Role,
    ...Cliente,
    ...TruequeCabecera,
    ...TruequeDetalle,
    ...Detalle
}