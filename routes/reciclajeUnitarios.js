
const { Router } = require('express');
const { check } = require('express-validator');


const { valorReciclajeUnitario } = require('../controllers/reciclajeUnitarios');
const ReciclajeUnitario = require('../models/reciclajeUnitario');

const router = Router();


router.post('/valorReciclajeUnitario', valorReciclajeUnitario );

module.exports = router;