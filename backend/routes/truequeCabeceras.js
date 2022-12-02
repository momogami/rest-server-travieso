
const { Router } = require('express');
const { check } = require('express-validator');

const { crearTruequeCabecera } = require('../controllers/truequeCabeceras');

const router = Router();


router.post('/crearTruequeCabecera', crearTruequeCabecera );

module.exports = router;