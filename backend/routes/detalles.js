const { Router } = require('express');
const { check } = require('express-validator');

const {obtenerRopasTallasPremium,
       obtenerPrendasSegunda,
       obtenerPrendasDonacion,
       obtenerPrendasDescuento } = require('../controllers/detalles');


const router = Router();

router.get('/obtenerRopasTallasPremium', obtenerRopasTallasPremium );
    
router.get('/obtenerPrendasSegunda', obtenerPrendasSegunda )

router.get('/obtenerPrendasDonacion', obtenerPrendasDonacion )

router.get('/obtenerPrendasDescuento', obtenerPrendasDescuento )

module.exports = router;