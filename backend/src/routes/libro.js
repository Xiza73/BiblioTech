const express = require('express');
const router = express.Router();

//Controller
const { create,
        read, 
        readById,
        update, 
        remove,
        readCat,
        readByCat,
        readByTitle } = require('../controllers/libroController');

router.post('/', create);

router.get('/', read);

router.get('/id', readById);

router.get('/cat', readByCat);

router.get('/cate', readCat);

router.get('/title', readByTitle);

router.put('/:id', update);

router.delete('/:id', remove);



module.exports = router;