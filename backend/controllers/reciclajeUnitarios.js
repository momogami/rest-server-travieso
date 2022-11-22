const { response, request } = require('express');

const { coleccionVacia } = require('../helpers/validar-colecciones');
const reciclajeUnitario = require('../models/reciclajeUnitario');

const ReciclajeUnitario = require('../models/reciclajeUnitario');


const valorReciclajeUnitario = async(req = request, res = response) => {

    const { deuda } = req.body;

    const objetoReciclajeUnitario = await ReciclajeUnitario.find();
    const existenDatos = Object.entries(objetoReciclajeUnitario).length === 0;

    if( existenDatos == false ){
        ReciclajeUnitario.collection.drop();
        const reciclajeUnitario = new ReciclajeUnitario({ deuda: deuda });
        reciclajeUnitario.save();
    }

    const recilajeUnitario = new ReciclajeUnitario({ deuda: deuda });
    recilajeUnitario.save();

    res.json({
        mesg: "funca"
    })
    
}

module.exports = {
    valorReciclajeUnitario
}