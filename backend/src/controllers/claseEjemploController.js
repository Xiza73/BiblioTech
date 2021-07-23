const { errorHandler } = require('../helpers/dbErrorHandler');
//Model
const ClaseEjemplo = require('../models/ClaseEjemplo');

exports.create = async (req, res) => {
    const { title, 
            description } = req.body;
    const obj = new ClaseEjemplo({
        title, 
        description
    })
    await obj.save((err, data) => {
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
    await ClaseEjemplo.find().exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err),
                status: 0,
                msg: "Error al obtener datos"
            })
        }
        return res.json(data);
    });
}

exports.readId = async (req, res) => {
    await ClaseEjemplo.findById(req.params.id)
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
    const { title, description } = req.body;
    await ClaseEjemplo.findByIdAndUpdate(req.params.id, {
        title,
        description
    });
    res.json({
        status: 1,
        msg: "Objeto actualizado"
    })
}

/*exports.delet = async (req, res) => {
    await ClaseEjemplo.findByIdAndDelete(req.params.id);
    res.json({
        status: 1,
        msg: "Objeto eliminado"
    })
}*/
exports.remove = async (req, res) => {
    const obj = req.claseEjemplo;
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
    await ClaseEjemplo.findById(id).exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: err,
                status: 0,
                msg: "No se encontró el objeto"
            })
        }
        req.claseEjemplo = data;
        next();
    })
}