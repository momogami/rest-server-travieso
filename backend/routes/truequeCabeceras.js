
const { Router } = require('express');
const { check } = require('express-validator');

const { crearTruequeCabecera,
        consultaEntreFechas,
        actualizarConResumen } = require('../controllers/truequeCabeceras');

const router = Router();


router.post('/crearTruequeCabecera', crearTruequeCabecera );

router.post('/consultaEntreFechas', consultaEntreFechas);

router.put('/actualizarConResumen', actualizarConResumen);


module.exports = router;