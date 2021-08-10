const { errorHandler } = require('../helpers/dbErrorHandler');
//Model
const Libro = require('../models/Libro');
const { addLibro, findLibro, findLibroByCat, findLibroByTitle, findLibroById, removeLibro, updateLibro } = require('../dao/libroDAO')
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
    let confirm = await addLibro(data.arc_libro, data.titulo, data.autor, data.categoria, data.pais, data.fch_pub, foto_data, foto_tipo);
    if(confirm.error){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}

exports.read = async (req, res) => {
    let data = await findLibro();
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.readById = async (req, res) => { 
    let data = await findLibroById(req.params.id);
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.update = async (req, res) => {
    let data = req.body;
    let confirm = await updateLibro(req.params.id, data.arc_libro, data.titulo, data.autor, data.categoria, data.pais, data.fec_pub, foto_data, foto_tipo);
    if(confirm.error){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}

exports.remove = async (req, res) => {
    let confirm = await removeLibro(req.params.id);
    if(confirm.error){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}

exports.readByCat = async (req, res) =>{
    const {categoria,
           cantidad} = req.body
    let data = await findLibroByCat(categoria, cantidad);
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.readByTitle = async (req, res) =>{
    console.log("hi"); 
    const {  titulo  } = req.body
    let data = await findLibroByTitle(titulo);    
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}