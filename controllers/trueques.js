const { response, request } = require('express');


const Trueque            = require('../models/trueque');
const Premium            = require('../models/premium');
const PremiumUnitario    = require('../models/premiumUnitario');
const Segunda            = require('../models/segunda');
const Donacion           = require('../models/donación');
const Reciclaje          = require('../models/reciclaje');
const Descuento          = require('../models/descuento');
const Usuario            = require('../models/usuario');
const Cliente            = require('../models/cliente');


const crearTrueque = async(req = request, res = response) => {
    // creamos el trueque
    const trueque = new Trueque();

    //obtemenos el nombre completo del colaborador
    const { nombreCompleto } = req.body;
    //buscamos al colaborador dentro de la DB Usuarios
     colaborador = await Usuario.findOne( nombreCompleto )    
    //le añadimos al trueque el id del colaborador
    trueque.idUsuario = colaborador;

    //conseguimos la fecha actual
    const hoy = new Date();
    //añadimos la fecha al trueque
    trueque.fecha = hoy;
    //guardamos el trueque
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
        idTrueque: trueque._id
    })
}

const agregarCliente = async(req = request, res = response) => {
    const {idTrueque, rutCliente} = req.body;
    const trueque = await Trueque.findById( idTrueque );
    const cliente = await Cliente.findOne( { rut: rutCliente } );
    trueque.idCliente = cliente._id;
    trueque.save();

    res.json({
        msg: 'Funca'
    })
}

const agregarPremium = async(req = request, res = response) => {
    // obtener los datos entregados por el body
    const { idTrueque, ropa, talla, cantidad} = req.body;

    // buscar el trueque a traves del _id
    const trueque = await Trueque.findById( idTrueque )

    // buscar el premiumUnitario
    const premiumUnitario = await PremiumUnitario.findOne({ ropa: ropa, talla: talla })

    // crear nueva collecion premium
    const premium = new Premium();

    // añadir id y cantidad de ropa premiumUnitario a Premium
    premium.idPremiumUnitario = premiumUnitario._id;
    premium.cantidad          = cantidad;
    premium.puntos            = cantidad * premiumUnitario.puntos;

    // añadir idPremium a Trueque
    trueque.idPremium         = premium._id;

    //guardar adiciones 
    trueque.save();
    premium.save();
    
    
    res.json({
        premiumUnitario: premiumUnitario,
        premium: premium,
        trueque: trueque

    })
}

module.exports = {
    crearTrueque,
    agregarCliente,
    agregarPremium
}