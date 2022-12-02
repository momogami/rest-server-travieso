const { response, request } = require('express');

const TruequeCabecera = require('../models/truequeCabecera')

const crearTruequeCabecera = async(req, res = response) => {
    
    

    
    res.json({
        msg: 'Funca'
    })
    
};



module.exports = {
    crearTruequeCabecera,
}