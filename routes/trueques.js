
const { Router } = require('express');
const { check } = require('express-validator');


const { crearTrueque, agregarCliente, agregarPremium, agregarSegunda } = require('../controllers/trueques');

const router = Router();


router.post('/crearTrueque', crearTrueque );

router.post('/agregarCliente',agregarCliente );

router.post('/agregarPremium', agregarPremium );

router.post('/agregarSegunda', agregarSegunda );


module.exports = router;