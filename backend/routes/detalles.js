const { Router } = require('express');
const { check } = require('express-validator');

const { post, crearSegunda } = require('../controllers/detalles');


const router = Router();

router.post('/crearSegunda', crearSegunda );
    

module.exports = router;