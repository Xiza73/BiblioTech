const { errorHandler}  = require('../helpers/dbErrorHandler');
//Model
const Favorito = require('../models/Favorito');

exports.create = async (req, res) => {
    const { estado,
            id_usuario,
            id_libro } = req.body;
    const obj = new Favorito({
            estado,
            id_usuario,
            id_libro});
    await obj.save((data, err) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err),
                status: 0,
                msg: "Error al insertar datos"
            });
        }
        res.json({
            status: 1,
            msg: "Insertado correctamente"
        });
    });    
}

exports.read = async (req, res) => {
    await Favorito.find().exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err),
                status: 0,
                msg: "Error al obtener datos"
            })
        }
        res.json(data);
    });
}

exports.readById = async (req, res) => {
    await Favorito.findById(req.params.id)
    .exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err),
                status: 0,
                msg: "Error al encontrar objeto"
            })
        }
        res.json(data);
    });
}

exports.update = async (req, res) => {
    const { estado,
        id_usuario,
        id_libro } = req.body;
    await Favorito.findByIdAndUpdate(req.params.id, { 
        estado,
        id_usuario,
        id_libro 
    });
    res.json({
        status: 1,
        msg: "Objeto actualizado"
    })
}

exports.remove = async (req, res) => {
    const obj = req.Favorito;
    await obj.remove((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err),
                status: 0,
                msg: "Error al eliminar datos"
            })
        }
        res.json({
            status: 1,
            msg: "Objeto eliminado"
        });
    })
}

exports.objectById = async (req, res, next, id) => {
    await Favorito.findById(id).exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: err,
                status: 0,
                msg: "No se encontró el objeto"
            })
        }
        req.Favorito = data;
        next();
    })
}