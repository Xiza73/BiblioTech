const express = require('express');
const router = express.Router();

//Controller
const { signup,
        signin, 
        signout } = require('../controllers/authController');

router.post('/', signup);
router.post('/s', signin);
router.post('/a', signout);

module.exports = router;