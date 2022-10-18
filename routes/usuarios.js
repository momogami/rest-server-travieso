
const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos')
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validatos');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet );

router.post('/',[
    check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
    check('password', 'El password debe contener mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    /* check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']), */
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
] ,usuariosPut);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;