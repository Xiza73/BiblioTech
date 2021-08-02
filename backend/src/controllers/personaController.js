const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
//Model
const Persona = require('../models/Persona');

exports.create = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => { 
        if (err) {
            return res.status(400).json({
                error: "Error al leer datos"
            })
        }
        const { id_usuario, 
                nombre,
                apellido } = fields;
        const persona = new Persona(fields);
        await persona.save((err, data) => {
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
    })
}

exports.read = async (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : 'nombre'
    await Persona.find()
        .populate({
            path: 'id_usuario',
            select: 'usuario',
            populate: {
                path: 'rol',
                select: 'nombre -_id'
            }
        })
        .select('nombre apellido id_usuario')
        .sort([[sortBy, order]])
        .exec((err, data) => {
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
    await Persona.findById(req.params.id)
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
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {  
        const { id_usuario, 
                nombre,
                apellido } = fields;
        await ClaseEjemplo.findByIdAndUpdate(req.params.id, fields);
        res.json({
            status: 1,
            msg: "Objeto actualizado"
        })
    })
    
}
exports.remove = async (req, res) => {
    const obj = req.Persona;
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
    Persona.findById(id).exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: err,
                status: 0,
                msg: "No se encontró el objeto"
            })
        }
        req.Persona = data;
        next();
    })
}