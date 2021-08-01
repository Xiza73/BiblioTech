const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
//Model
const Usuario = require('../models/Usuario');

exports.create = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => { 
        if (err) {
            return res.status(400).json({
                error: "Error al leer datos"
            })
        }
        const { usuario, 
                contrasenia,
                correo,
                rol } = fields;
        const nuevoUsuario = new Usuario(fields);
        if (files.avatar) {
            if (files.avatar.size > 1000000) {
              return res.status(400).json({
                error: "La imagen debe pesar menos de 1MB"
              })
            }
            nuevoUsuario.avatar.data = fs.readFileSync(files.avatar.path)
            nuevoUsuario.avatar.contentType = files.avatar.type
        }
        await nuevoUsuario.save((err, data) => {
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
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name'
    await Usuario.find()
        .select("-avatar")
        .populate("rol")
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

exports.avatar = async (req, res) => {
    if(req.usuario.avatar.data){
        await res.set('Content-Type', req.usuario.avatar.contentType)
        return res.send({
            status: 1,
            msg: "Foto Actualizada"
        })
    }
}


exports.update = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {  
        const { usuario, 
                contrasenia,
                correo,
                rol,
                imagen } = fields;
        await ClaseEjemplo.findByIdAndUpdate(req.params.id, fields);
        res.json({
            status: 1,
            msg: "Objeto actualizado"
        })
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

exports.remove = () =>{}