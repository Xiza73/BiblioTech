const express = require('express');
const router = express.Router();

//Controller
const { create,
        readAnt,
        readNew, 
        readByCom,  
        update, 
        remove } = require('../controllers/comentarioController');

router.post('/', create);

router.get('/com', readByCom);

router.get('/desc', readNew);

router.get('/asc', readAnt);

router.put('/:id', update);

router.delete('/:id', remove);


module.exports = router;