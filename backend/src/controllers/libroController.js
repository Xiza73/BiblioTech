const { errorHandler } = require('../helpers/dbErrorHandler');
//Model
const Libro = require('../models/Libro');

exports.create = async (req, res) => {
    const { arc_libro, 
            titulo,
            autor,
            genero,
            pais,
            fec_pub } = req.body;
    const obj = new Libro({ arc_libro, 
        titulo,
        autor,
        genero,
        pais,
        fec_pub });
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
    await Libro.find().exec((err, data) => {
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
    await Libro.findById(req.params.id)
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
    const { arc_libro, 
        titulo,
        autor,
        genero,
        pais,
        fec_pub } = req.body;
    await Libro.findByIdAndUpdate(req.params.id, { arc_libro, 
        titulo,
        autor,
        genero,
        pais,
        fec_pub });
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
    const obj = req.Libro;
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
    Libro.findById(id).exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: err,
                status: 0,
                msg: "No se encontró el objeto"
            })
        }
        req.Libro = data;
        next();
    })
}