const { response, request } = require('express');


const Cliente = require('../models/cliente');


const clientesGet = async(req = request, res = response) => {

    const cliente = await Cliente.find()

    res.json({
        cliente
    })
}

const clienteGet = async(req = request, res = response) => {
    
    const { rut } = req.body;
    const cliente = await Cliente.findOne( {rut} )

    const vacio = Object.entries(cliente).length === 0;

    if ( vacio == true ) {
        res.json({
            estado: false
        })
        return
    }
    
    res.json({
        idCliente: cliente._id,
        estado: true
    });
}


const clientesPost = async(req = request, res = response) => {
    const { nombre, apellido, correo, rut, celular } = req.body;
    const cliente = new Cliente({ nombre, apellido, correo, rut, celular });
    cliente.celular = "+56" + cliente.celular;
   
    // Guardar en BD
    await cliente.save();

    res.json({
        cliente
    });
}

const clientesPut = async(req = request, res = response) => {
    res.json({
        msg: 'put API - controllers'
    })
}

const clientesDelete = async(req = request, res = response) => {
    res.json({
        msg: 'delete API - controllers'
    })
}

const clientesPatch = async(req = request, res = response) => {
    res.json({
        msg: 'delete API - controllers'
    })
}

module.exports = {
    clientesGet,
    clientesDelete,
    clientesPost,
    clientesPut,
    clientesPatch,
    clienteGet
}