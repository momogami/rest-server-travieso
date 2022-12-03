
const { Router } = require('express');
const { check } = require('express-validator');

const { crearTruequeCabecera,
        consultaEntreFechas,
        actualizarConResumen,
        historialTrueques } = require('../controllers/truequeCabeceras');

const router = Router();


router.post('/crearTruequeCabecera', crearTruequeCabecera );

router.post('/consultaEntreFechas', consultaEntreFechas);

router.put('/actualizarConResumen', actualizarConResumen);

router.get('/historialTrueques', historialTrueques)


module.exports = router;