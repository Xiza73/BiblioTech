const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { addUsuario, findUsuarioById } = require('../dao/usuarioDAO');
//Model
const Usuario = require('../models/Usuario');

exports.create = async (req, res) => {
    let data = req.body;
    let foto_data = null;
    let foto_tipo = null;
    if (data.foto) {
      foto_data = Buffer.from(data.foto, "base64");
      foto_tipo = data.foto_tipo;
      if (foto_data > 100000) {
        respuesta.err.push("La imagen debe pesar menos de 1MB");
        foto_data = null;
        foto_tipo = null;
      }
    }
    let confirm = await addUsuario(data.usuario, data.correo, await bcrypt.hash(data.contrasenia, saltRounds), rol.id, foto_data, foto_tipo);
    if(confirm.error){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}

exports.read = async (req, res) => { //falta modificar DAO
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
    const {  id  } = req.query;
    let data = await findUsuarioById(id);
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.avatar = async (req, res) => {//falta modificar DAO
    if(req.usuario.avatar.data){
        await res.set('Content-Type', req.usuario.avatar.contentType)
        return res.send({
            status: 1,
            msg: "Foto Actualizada"
        })
    }
}


exports.update = async (req, res) => { //falta modificar DAO
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

exports.remove = () =>{ //falta modificar DAO

} 