
const { Router } = require('express');
const { check } = require('express-validator');

const { agregarPremium } = require('../controllers/truequeCabeceras');

const router = Router();


router.post('/agregarPremium', agregarPremium );

module.exports = router;