
const { Router } = require('express');
const { check } = require('express-validator');


const { 
        validarCampos,
    } = require('../middlewares')

const { esRutValido, 
        emailExisteClientes } = require('../helpers/db-validatos');

const { clientesGet,    
        clientesPut,
        clientesPost,
        clientesDelete,
        clientesPatch} = require('../controllers/clientes')

const router = Router();


router.get('/', clientesGet );

router.put('/', clientesPut);

router.post('/',[
        check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
        check('rut', 'Rut no valido').not().isEmpty().isNumeric(),
        check('rut').custom(esRutValido),
        check('correo', `El correo no es valido`).isEmail(),
        check('correo').custom( emailExisteClientes ),
        check('celular', 'El celular no es valido').isLength({ min: 9, max: 9 }).isNumeric(),   
        validarCampos
    ], clientesPost);

router.delete('/', clientesDelete);

router.patch('/', clientesPatch);


module.exports = router;