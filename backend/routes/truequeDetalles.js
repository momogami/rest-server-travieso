
const { Router } = require('express');

const { agregarPremium, agregarSegunda, agregarDescuento, agregarDonacion, agregarReciclaje, borrarTruequeDetalle } = require('../controllers/truequeDetalles');

const router = Router();


router.post( '/agregarPremium', agregarPremium );

router.post( '/agregarSegunda', agregarSegunda );

router.post( '/agregarDescuento', agregarDescuento );

router.post( '/agregarDonacion', agregarDonacion );

router.post( '/agregarReciclaje', agregarReciclaje );

router.delete('/borrarTruequeDetalle', borrarTruequeDetalle );

module.exports = router;