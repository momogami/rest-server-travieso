const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { cargarTablaDePuntos,
     borrarTodoPremium,
     cargarArchivo,
     actualizarTablaDePuntos, 
     borrarTodoSegunda,
     cargarTablaDescuentos,
     cargarTablaDonacion,
     borrarTodoDescuento,
     borrarTodoDonacion,  
     subirTablaPremium,
     subirTablaSegunda} = require('../controllers/uploads');


router.post( '/', cargarArchivo );

router.post('/subirTablaSegunda', subirTablaSegunda );

router.post( '/subirTablaPremium', subirTablaPremium );

router.post( '/cargarTablaDePuntos', cargarTablaDePuntos );

router.post( '/cargarTablaDescuentos', cargarTablaDescuentos );

router.post( '/cargarTablaDonacion', cargarTablaDonacion);

router.put('/actualizarTablaDePuntos', actualizarTablaDePuntos);

router.delete( '/borrarPremium', borrarTodoPremium );

router.delete( '/borrarSegunda', borrarTodoSegunda );

router.delete( '/borrarDescuento', borrarTodoDescuento);

router.delete( '/borrarDonacion', borrarTodoDonacion);



module.exports = router;