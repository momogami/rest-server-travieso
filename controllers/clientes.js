const { response, request } = require('express');


const Cliente = require('../models/cliente');


const clientesGet = async(req = request, res = response) => {
    res.json({
        msg: 'get API - controllers'
    })
}

const clientesPost = async(req = request, res = response) => {
    const { nombre, correo, rut, celular } = req.body;
    const cliente = new Cliente({ nombre, correo, rut, celular });

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
    clientesPatch
}