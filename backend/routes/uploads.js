const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const {   borrarTodoDescuento,
          borrarTodoDonacion, 
          borrarTodoPremium,
          borrarTodoSegunda,
          subirTablaDescuentos,
          subirTablaDonacion, 
          subirTablaPremium,
          subirTablaSegunda,
          darValorReciclaje,
          subirTodo,
          borrarTodo } = require('../controllers/uploads');


router.post( '/subirTablaSegunda', subirTablaSegunda );

router.post( '/subirTablaPremium', subirTablaPremium );

router.post( '/subirTablaDescuentos', subirTablaDescuentos );

router.post( '/subirTablaDonacion', subirTablaDonacion);

router.post( '/darValorReciclaje', darValorReciclaje);

router.post( '/subirTodo', subirTodo);

router.delete( '/borrarPremium', borrarTodoPremium );

router.delete( '/borrarSegunda', borrarTodoSegunda );

router.delete( '/borrarDescuento', borrarTodoDescuento);

router.delete( '/borrarDonacion', borrarTodoDonacion);

router.delete( '/borrarTodo', borrarTodo)


module.exports = router;