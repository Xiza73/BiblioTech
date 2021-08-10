const express = require('express');
const router = express.Router();

//Controller
const { create,
        readRank, 
        readByUser,
        readByLib,
        update, 
        //delet,
        remove} = require('../controllers/favoritoController');

router.post('/', create);

router.get('/rank', readRank);

router.get('/user', readByUser);

router.get('/lib', readByLib);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;