
const { Router } = require('express');
const { check } = require('express-validator');


const { premiumPost } = require('../controllers/premiums')

const router = Router();


router.post('/', premiumPost );


module.exports = router;