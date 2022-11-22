
const { Router } = require('express');
const { check } = require('express-validator');


const { premiumPost, borrarPremiumUnitario } = require('../controllers/premiums');
const premium = require('../models/premium');

const router = Router();


router.post('/', premiumPost );

router.delete('/borrarPremiumUnitario', borrarPremiumUnitario )


module.exports = router;