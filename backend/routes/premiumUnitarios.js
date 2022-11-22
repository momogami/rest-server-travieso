
const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerTallas, obtenerRopas } = require('../controllers/premiumUnitarios');
const premiumUnitario = require('../models/premiumUnitario');

const router = Router();


router.get('/obtenerTallas', obtenerTallas );

router.get('/obtenerRopas', obtenerRopas)


module.exports = router;