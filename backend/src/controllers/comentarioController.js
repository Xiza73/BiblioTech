const { errorHandler}  = require('../helpers/dbErrorHandler');
//Model
const Comentario = require('../models/Comentario');

exports.create = async (req, res) => {
    const { comentario,
            id_usuario,
            id_libro } = req.body;
    const obj = new Comentario({
            comentario,
            id_usuario,
            id_libro});
    console.log(obj);
    await obj.save((err, data) => {
        if(err){
            console.log("error");
            return res.status(400).json({
                error: errorHandler(err),
                status: 0,
                msg: "Error al insertar datos"
            })
        }
        console.log("hi");
        res.json({
            status: 1,
            msg: "Insertado correctamente"
        });
    });    
}

exports.read = async (req, res) => {
    if(!req.body){
    await Comentario.find().exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err),
                status: 0,
                msg: "Error al obtener datos"
            });
        }
        res.json(data);
    });
    }else{
        const { id_libro,
        id_usuario } = req.body;
        await Comentario.findById(comentario=> id_libro == comentario.id_libro && id_usuario == comentario.id_usuario)
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err),
                    status: 0,
                    msg: "Error al encontrar objeto"
                });
            }
            res.json(data);
        });
    }
}
/*
exports.readById = async (req, res) => {
    
    await Comentario.findById(req.params.id)
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
*/
exports.update = async (req, res) => {
    const { comentario,        
        id_usuario,
        id_libro } = req.body;
    await Comentario.findByIdAndUpdate(comentario=> id_libro == comentario.id_libro && id_usuario == comentario.id_usuario, { 
        comentario,
        id_usuario,
        id_libro 
    });
    res.json({
        status: 1,
        msg: "Objeto actualizado"
    })
}

exports.remove = async (req, res) => {
    const obj = req.Comentario;
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

exports.objectById = async (req, res, next) => {
    const { 
        id_usuario,
        id_libro } = req.body;
    await Comentario.findById(comentario=> id_libro == comentario.id_libro && id_usuario == comentario.id_usuario).exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: err,
                status: 0,
                msg: "No se encontró el objeto"
            })
        }
        req.Comentario = data;
        next();
    })
}