
const { Router } = require('express');
const { check } = require('express-validator');

const { crearTruequeCabecera, consultaEntreFechas } = require('../controllers/truequeCabeceras');

const router = Router();


router.post('/crearTruequeCabecera', crearTruequeCabecera );

router.post('/consultaEntreFechas', consultaEntreFechas)

module.exports = router;