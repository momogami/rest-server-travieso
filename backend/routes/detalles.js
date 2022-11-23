
const { Router } = require('express');
const { check } = require('express-validator');


const { 
        validarCampos,
    } = require('../middlewares')

const { crearSegunda } = require('../controllers/detalles')

const router = Router();


router.get('/crearSegunda', crearSegunda );

module.exports = router;