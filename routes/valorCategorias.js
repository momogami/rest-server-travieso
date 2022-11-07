const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { cargarTablaDePuntos, borrarTodo } = require('../controllers/valorCategorias');


router.post( '/', cargarTablaDePuntos )

router.delete( '/', borrarTodo )


module.exports = router;