const Role = require('../models/role')
const Usuario = require('../models/usuario')
const Cliente = require('../models/cliente')

const { validateRUT } = require('validar-rut')
const { phone } = require('phone');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

//Usuario
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

//Clientes
const emailExisteClientes = async( correo = '' ) => {

    //Verificar si el correo existe
    const existeEmail = await Cliente.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`El correo: ${ correo } ya existe en la BD de clientes`)
    }
}

const validarCelular = async( celular = '' ) => {
    //Añadimos signo verificador
    celular = "+56" + celular;
    const celularValido = phone(celular)
    
    //Validar si el Celular es Chileno 
    if ( celularValido.countryIso3 !== 'CHL' ){
        throw new Error(`El celular: ${ celular } no es valido en el país`)
    }
}

const rutExiste = async( rut = '' ) => {
    
    //Validar si el rut ya existe
    const existeRut = await Cliente.findOne({ rut });
    if ( existeRut ){
        throw new Error(`El rut: ${ rut } ya existe en la BD`)
    }
}

const celularExiste = async( celular = '' ) => {
    
    //Validar si el celular ya existe
    celular = "+56" + celular
    const existeCelular = await Cliente.findOne({ celular });
    if ( existeCelular ){
        throw new Error(`El celular: ${ celular } ya existe en la BD`)
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    esRutValido,
    emailExisteClientes,
    validarCelular,
    rutExiste,
    celularExiste
}