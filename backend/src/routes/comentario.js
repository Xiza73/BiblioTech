const express = require('express');
const router = express.Router();

//Controller
const { create,
        read, 
        readById,
        update, 
        //delet,
        remove,
        objectById } = require('../controllers/comentarioController');

router.post('/', create);

router.get('/', read);

//router.get('/', readById);

router.put('/', update);

//router.delete('/:id', delet);

router.delete('/', remove);

router.param('', objectById);


module.exports = router;