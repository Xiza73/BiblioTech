const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { addUsuario, findUsuarioById, findUsuario, updateUsuario, removeUsuario } = require('../dao/usuarioDAO');
const { deletePersonaByIdUsuario } = require('../dao/personaDAO');
const bcrypt = require('bcrypt');
const saltRounds = 13;
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
    if(confirm.status == 0){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}

exports.read = async (req, res) => { //falta modificar DAO
    let data = await findUsuario();
    //console.log(data[1]._id);
    if(data.status == 0){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.readById = async (req, res) => {
    const {  id  } = req.query;
    let data = await findUsuarioById(id);
    if(data.status == 0){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.update = async (req, res) => { 
    let data = req.body;
    let confirm = await updateUsuario(req.params.id, data.usuario, data.correo, await bcrypt.hash(data.contrasenia, saltRounds), rol.id, foto_data, foto_tipo);
    if(confirm.status == 0){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
    
}

exports.remove = async (req,res) => {   
    deletePersonaByIdUsuario(req.params.id)
    let confirm = await removeUsuario(req.params.id);
    if(confirm.status == 0){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
} 