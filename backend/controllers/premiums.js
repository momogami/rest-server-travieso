const { response, request } = require('express');

const Premium = require('../models/premium');
const PremiumUnitario = require('../models/premiumUnitario')

const premiumPost = async(req = request, res = response) => {
    // Buscar en la base de datos el trueque unitario
    const { talla, ropa, cantidad } = req.body;
    const premiumUnitario = await PremiumUnitario.findOne({talla: talla, ropa: ropa})
    // Crea un nuevo objeto Premium y luego le añade su info
    const premium = new Premium();
    premium.idPremiumUnitario = premiumUnitario._id;
    premium.cantidad = cantidad;
    premium.puntosTotales = cantidad * premiumUnitario.puntos;
    premium.save();

    res.json(premium)
}

const borrarPremiumUnitario = async(req = request, res = response) => {
    const { _id } = req.body;
    const premium = await Premium.findByIdAndDelete( _id )   

    res.json({
        msg: 'Se ha eliminado el objeto' + premium
    })
}


module.exports = {
    premiumPost,
    borrarPremiumUnitario,
}