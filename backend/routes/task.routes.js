const express = require('express');
const claseEjemplo = require('../models/claseEjemplo');
const router = express.Router();

//Models
const ClaseEjemplo = require('../models/claseEjemplo');

//Microservicios

    //objetos
router.get('/objetos', async (req, res) => {
    const objetos = await ClaseEjemplo.find();

    res.json(objetos)
});

router.get('/objetos/:id', async (req, res) => {
    const objetos = await ClaseEjemplo.findById(req.params.id);

    res.json(objetos)
});

router.post('/objetos', async (req, res) => {
    const { title, description } = req.body;
    const obj = new claseEjemplo({
        title, 
        description
    })
    await obj.save();
    console.log(obj);
    res.json({
        status: 1,
        msj: "Objeto guardado"
    });
});

router.put('/objetos/:id', async (req, res) => {
    const { title, description } = req.body;
    await claseEjemplo.findByIdAndUpdate(req.params.id, {
        title,
        description
    });
    res.json({
        status: 1,
        msj: "Objeto actualizado"
    })
});

router.delete('/objetos/:id', async (req, res) => {
    await claseEjemplo.findByIdAndDelete(req.params.id);
    res.json({
        status: 1,
        msj: "Objeto eliminado"
    })
});

module.exports = router;