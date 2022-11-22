
const { Router } = require('express');
const { check } = require('express-validator');


const { crearTrueque, agregarCliente, agregarPremium, agregarSegunda, agregarDescuento, agregarReciclaje, resumenTrueque, agregarDonacion } = require('../controllers/trueques');

const router = Router();


router.post('/crearTrueque', crearTrueque );

router.post('/agregarCliente',agregarCliente );

router.post('/agregarPremium', agregarPremium );

router.post('/agregarSegunda', agregarSegunda );

router.post('/agregarDescuento', agregarDescuento);

router.post('/agregarReciclaje', agregarReciclaje);

router.post('/agregarDonacion', agregarDonacion)

router.get('/resumenTrueque', resumenTrueque)


module.exports = router;