const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre= 'no name', apikey } = req.query;

    res.json({
        msg: 'get API - controllers',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res) => {

    const {nombre, edad} = req.body; 

    res.json({
        msg: 'post API - controllers',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {

    const  { id } = req.params;

    res.json({
        msg: 'put API - controllers',
        id
    })

}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controllers'
    })

}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controllers'
    })

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
}