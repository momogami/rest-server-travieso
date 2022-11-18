const { response, request } = require('express');


const Trueque   = require('../models/trueque');
const Premium   = require('../models/premium');
const Segunda   = require('../models/segunda');
const Donacion  = require('../models/donación');
const Reciclaje = require('../models/reciclaje');
const Descuento = require('../models/descuento');

const crearTrueque = async(req = request, res = response) => {
    
    const trueque = new Trueque();
    const hoy = new Date();
    const fecha = hoy.toLocaleDateString();
    trueque.fecha = fecha;
    console.log(typeof(fecha))
    trueque.save();
    
/*     const premium = new Premium();
    const segunda = new Segunda();
    const donacion = new Donacion();
    const reciclaje = new Reciclaje();
    const descuento = new Descuento();
    
    premium.save();
    segunda.save();
    donacion.save();
    reciclaje.save();
    descuento.save(); */


    res.json({
        msg: 'post API - controllers'
    })
}

module.exports = {
    crearTrueque
}