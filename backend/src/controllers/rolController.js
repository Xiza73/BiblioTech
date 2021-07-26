const { errorHandler } = require('../helpers/dbErrorHandler');
//Model
const Rol = require('../models/Rol');

exports.create = async (req, res) => {
    const { nombre } = req.body;
    const rol = new Rol({ nombre });
    await rol.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err),
                status: 0,
                msg: "Error al insertar datos"
            })
        }
        res.json({
            status: 1,
            msg: "Insertado correctamente"
        });
    });
}

exports.read = async (req, res) => {
    await Rol.find().exec((err, data) => {
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
    await Rol.findById(req.params.id)
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
    const { nombre } = req.body;
    await Rol.findByIdAndUpdate(req.params.id, { nombre });
    res.json({
        status: 1,
        msg: "Objeto actualizado"
    })
}

exports.remove = async (req, res) => {
    const rol = req.Rol;
    rol.remove((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err),
                status: 0,
                msg: "Error al eliminar datos"
            })
        }
        res.json({
            status: 1,
            msg: "Rol eliminado"
        });
    })
}

exports.objectById = async (req, res, next, id) => {
    Rol.findById(id).exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: err,
                status: 0,
                msg: "No se encontró el objeto"
            })
        }
        req.Rol = data;
        next();
    })
}