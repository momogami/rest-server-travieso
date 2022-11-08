const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { cargarTablaDePuntos, borrarTodo, cargarArchivo, actualizarTablaDePuntos } = require('../controllers/uploads');


router.post( '/', cargarArchivo )

router.post( '/cargarTablaDePuntos', cargarTablaDePuntos )

router.put('/actualizarTablaDePuntos', actualizarTablaDePuntos)

router.delete( '/', borrarTodo )


module.exports = router;