const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');



const usuariosGet = async(req = request, res = response) => {
 
    const { limite = 5  , desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, usuarios ] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const crearUsuario = async(req, res = response) => {

    const { nombre, apellido, correo, password, repetirPassword } = req.body;

    if(password != repetirPassword){
        res.status(400).json({msg: ' La contraseña no es la misma '});
        return;
    }
    const usuario = new Usuario({ nombre, apellido, correo, password, rol: 'USER_ROLE' });

    // Encriptar Password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPut = async(req, res = response) => {

    const  { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    if( password ){
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto)

    res.json(usuario)
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controllers'
    })
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false })


    res.json( usuario );
}

const obtenerUsuarios = async(req, res = response) => {
    const listaUsuarios = [];
    const usuarios = await Usuario.find()
    //Recorrer la colección para obtener las tallas
         usuarios.forEach(usuario => {
            if(usuario.rol == 'USER_ROLE'){
            const cosita = usuario.nombre
            listaUsuarios.push(cosita)
            }
         }); 
    
    res.json( listaUsuarios )    
}



module.exports = {
    usuariosGet,
    crearUsuario,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
    obtenerUsuarios
}