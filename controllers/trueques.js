const { response, request } = require('express');


const Trueque            = require('../models/trueque');
const Premium            = require('../models/premium');
const PremiumUnitario    = require('../models/premiumUnitario');
const Segunda            = require('../models/segunda');
const SegundaUnitario    = require('../models/segundaUnitario');
const Donacion           = require('../models/donación');
const DescuentoUnitario  = require('../models/descuentoUnitario');
const Reciclaje          = require('../models/reciclaje');
const ReciclajeUnitario  = require('../models/reciclajeUnitario');
const Descuento          = require('../models/descuento');
const Usuario            = require('../models/usuario');
const Cliente            = require('../models/cliente');


const crearTrueque = async(req = request, res = response) => {
    // creamos el trueque
    const trueque = new Trueque();
    // puntosTotales parten en 0
    trueque.puntosTotales = 0;
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
    trueque.idPremium.push(premium._id);
    trueque.puntosTotales     = trueque.puntosTotales + (cantidad * premiumUnitario.puntos)
    //guardar adiciones 
    trueque.save();
    premium.save();
    
    
    res.json({
        premiumUnitario: premiumUnitario,
        premium: premium,
        trueque: trueque

    })
}

const agregarSegunda = async(req = request, res = response) => {
    // obtener los datos entregados por el body
    const { idTrueque, ropa, cantidad} = req.body;

    // buscar el trueque a traves del _id
    const trueque = await Trueque.findById( idTrueque )

    // buscar el segundaUnitario
    const segundaUnitario = await SegundaUnitario.findOne({ ropa: ropa })

    // crear nueva collecion segunda
    const segunda = new Segunda();

    // añadir id y cantidad de ropa segundaUnitario a Segunda
    segunda.idSegundaUnitario = segundaUnitario._id;
    segunda.cantidad          = cantidad;
    segunda.puntos            = cantidad * segundaUnitario.puntos;

    // añadir idSegunda a Trueque
    trueque.idSegunda.push(segunda._id);
    trueque.puntosTotales     = trueque.puntosTotales + (cantidad * segundaUnitario.puntos)
    //guardar adiciones 
    trueque.save();
    segunda.save();

    res.json({
        segundaUnitario: segundaUnitario,
        segunda: segunda,
        trueque: trueque

    })
}

const agregarDescuento = async(req = request, res = response) => {
    // obtener los datos entregados por el body
    const { idTrueque, ropa, cantidad} = req.body;

    // buscar el trueque a traves del _id
    const trueque = await Trueque.findById( idTrueque )

    // buscar el descuentoUnitario
    const descuentoUnitario = await DescuentoUnitario.findOne({ ropa: ropa })

    // crear nueva collecion descuento
    const descuento = new Descuento();

    // añadir id y cantidad de ropa descuentoUnitario a Descuento
    descuento.idDescuentoUnitario = descuentoUnitario._id;
    descuento.cantidad            = cantidad;

    // añadir idPremium a Trueque
    trueque.idDescuento.push( descuento._id )

    //guardar adiciones 
    trueque.save();
    descuento.save();    


    res.json({
        descuentoUnitario: descuentoUnitario,
        descuento: descuento,
        trueque: trueque

    })
}

const agregarReciclaje = async(req = request, res = response) => {
    // obtener los datos entregados por el body
    const { idTrueque, idReciclaje, kilos, cantidad} = req.body;

    // buscar el trueque a traves del _id
    const trueque = await Trueque.findById( idTrueque )

    // buscar el reciclajeUnitario
    const reciclajeUnitario = await ReciclajeUnitario.findOne({ idReciclajeUnitario: idReciclaje })

    // crear nueva collecion reciclaje
    const reciclaje = new Reciclaje();

    // añadir id y cantidad hilado textil reciclajeUnitario a Reciclaje
    reciclaje.idReciclajeUnitario = reciclajeUnitario._id;
    reciclaje.cantidad            = cantidad;
    reciclaje.kilos               = kilos;
    reciclaje.deuda               = kilos * reciclajeUnitario.deuda

    // añadir idPremium a Trueque
    trueque.idReciclaje           = reciclaje._id;

    //guardar adiciones 
    trueque.save();
    reciclaje.save();    


    res.json({
        reciclajeUnitario: reciclajeUnitario,
        reciclaje: reciclaje,
        trueque: trueque

    })
}

module.exports = {
    crearTrueque,
    agregarCliente,
    agregarPremium,
    agregarSegunda,
    agregarDescuento,
    agregarReciclaje
}