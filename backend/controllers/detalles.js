const { response, request } = require('express');

const Detalle = require('../models/detalle');


const crearSegunda = async(req = request, res = response) => {
    const { talla, ropa, puntos} = req.body;
    const detalle = new Detalle({})
    res.json({
        msg: 'uwu'
    })
}


module.exports = {
     crearSegunda
}