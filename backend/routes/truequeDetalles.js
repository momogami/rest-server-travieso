
const { Router } = require('express');

const { agregarPremium, agregarSegunda } = require('../controllers/truequeDetalles');

const router = Router();


router.post( '/agregarPremium', agregarPremium );

router.post( '/agregarSegunda', agregarSegunda )

module.exports = router;