const { response, request } = require('express');

const Detalle = require('../models/detalle')

const crearSegunda = async(req, res = response) => {
    const { talla, ropa, puntos } = req.body;
    
};



module.exports = {
    crearSegunda,
}