
const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validatos');

const { usuariosGet, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPatch, 
        crearUsuario} = require('../controllers/usuarios');


const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
] ,usuariosPut);

router.post('/crearUsuario',[
    check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
    check('password', 'El password debe contener mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    /* check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']), */
    validarCampos
], crearUsuario);

router.delete('/:id',[
    validarJWT,
    /* esAdminRole, */
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;