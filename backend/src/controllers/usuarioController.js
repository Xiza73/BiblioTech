const { errorHandler } = require('../helpers/dbErrorHandler');
//Model
const Usuario = require('../models/Usuario');

exports.create = async (req, res) => {
    const { usuario, 
            contrasenia,
            correo,
            rol,
            imagen } = req.body;
    const obj = new Usuario({ usuario, 
        contrasenia,
        correo,
        rol,
        imagen });
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
    await Usuario.find().exec((err, data) => {
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
    await Usuario.findById(req.params.id)
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
    const { usuario, 
        contrasenia,
        correo,
        rol,
        imagen } = req.body;
    await ClaseEjemplo.findByIdAndUpdate(req.params.id, { usuario, 
        contrasenia,
        correo,
        rol,
        imagen });
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
    const obj = req.Usuario;
    obj.remove((err, data) => {
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
    Usuario.findById(id).exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: err,
                status: 0,
                msg: "No se encontró el objeto"
            })
        }
        req.Usuario = data;
        next();
    })
}