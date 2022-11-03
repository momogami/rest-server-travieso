
const { Router } = require('express');

const { premiumUnitariosPost, premiumUnitarioDelete } = require('../controllers/premiumUnitarios')

const router = Router();


router.post('/', premiumUnitariosPost );

router.delete('/', premiumUnitarioDelete);


module.exports = router;