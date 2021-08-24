const { errorHandler}  = require('../helpers/dbErrorHandler');
//Model
const Comentario = require('../models/Comentario');
const { addComentario, findComentarioNew, findComentarioAnt,findComentarioByCom, removeComentario,updateComentario } = require('../dao/comentarioDAO')

exports.create = async (req, res) => {
    let data = req.body;
    let confirm = await addComentario(data.comentario,data.id_usuario, data.id_libro);
    if(confirm.error){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);  
}

exports.readNew = async (req, res) => {
    const{
        id_libro
    } = req.query;
    let data = await findComentarioNew(id_libro);
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.readAnt = async (req, res) => {
    const{
        id_libro
    } = req.query;
    let data = await findComentarioAnt(id_libro);
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.readByCom = async (req, res) => {
    const{
        comentario
    } = req.query;
    let data = await findComentarioByCom(comentario);
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.update = async (req, res) => {
    let data = req.body;
    let confirm = await updateComentario(req.params.id,data.comentario, data.id_usuario, data.id_usuario);
    if(confirm.error){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}

exports.remove = async (req, res) => {
    let confirm = await removeComentario(req.params.id);
    if(confirm.error){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}

