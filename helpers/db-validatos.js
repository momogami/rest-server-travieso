const Role = require('../models/role')
const Usuario = require('../models/usuario')
const Cliente = require('../models/cliente')

const { validateRUT, getCheckDigit, generateRandomRUT } = require('validar-rut')

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

const emailExiste = async( correo = '' ) => {

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`El correo: ${ correo } ya existe en la BD`)
    }
}

const existeUsuarioPorId = async( id ) => {

    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ){
        throw new Error(`El id no existe --${id}--`)
    }
}

const esRutValido = async( rut = '' ) => {

    //Verificar si el rut es valido  
    const rutValido = validateRUT( rut )   
    if ( rutValido !== true ){
        throw new Error(`El rut: ${ rut } no es valido`)
    }
}

const emailExisteClientes = async( correo = '' ) => {

    //Verificar si el correo existe
    const existeEmail = await Cliente.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`El correo: ${ correo } ya existe en la BD de clientes`)
    }
}




module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    esRutValido,
    emailExisteClientes,
}