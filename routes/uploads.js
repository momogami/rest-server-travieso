const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { cargarTablaDePuntos, borrarTodoPremium, cargarArchivo, actualizarTablaDePuntos, borrarTodoSegunda } = require('../controllers/uploads');


router.post( '/', cargarArchivo )

router.post( '/cargarTablaDePuntos', cargarTablaDePuntos )

router.put('/actualizarTablaDePuntos', actualizarTablaDePuntos)

router.delete( '/borrarPremium', borrarTodoPremium )

router.delete( '/borrarSegunda', borrarTodoSegunda )

module.exports = router;