
const { Router } = require('express');
const { check } = require('express-validator');


const { 
        validarCampos,
    } = require('../middlewares')

const { esRutValido, 
        emailExisteClientes,
        validarCelular,
        rutExiste,
        celularExiste } = require('../helpers/db-validatos');

const { clientesGet,    
        clientesPut,
        clientesPost,
        clientesDelete,
        clientesPatch,
        clienteGet} = require('../controllers/clientes')

const router = Router();


router.get('/', clientesGet );

router.post('/obtenerCliente', clienteGet );

router.put('/', clientesPut);

router.post('/',[
        //Nombre
        check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
        //Apellido
        check('apellido', 'El Apellido es Obligatorio').not().isEmpty(),
        //Rut
        check('rut').custom( rutExiste ),
        check('rut', 'Rut no valido').not().isEmpty().isNumeric(),
        check('rut').custom( esRutValido ),
        //Correo
        check('correo', `El correo no es valido`).isEmail(),
        check('correo').custom( emailExisteClientes ),
        //Celular
        check('celular').custom(celularExiste),
        check('celular', 'El celular debe tener 9 caracteres').isLength({ min: 9, max: 9 }).isNumeric().custom( validarCelular),
        validarCampos
    ], clientesPost);

router.delete('/', clientesDelete);

router.patch('/', clientesPatch);


module.exports = router;