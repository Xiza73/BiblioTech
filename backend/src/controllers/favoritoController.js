const { errorHandler}  = require('../helpers/dbErrorHandler');
//Model
const Favorito = require('../models/Favorito');
const { addFavorito,  findFavoritoByUser, findFavoritoByLib, findFavoritoRank, removeFavorito, updateFavorito } = require('../dao/FavoritoDAO')
const {findLibroByTitle, findLibroById } = require('../dao/libroDAO')

exports.create = async (req, res) => {
    let data = req.body;
    let confirm = await addFavorito(data.id_usuario, data.id_libro);
    if(confirm.error){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);   
}

exports.readRank = async (req, res) => {
    const{
        cantidad
    } = req.query;
    console.log(cantidad);
    let data = await findFavoritoRank(cantidad);
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.readByUser = async (req, res) => {
    const{
        id_usuario
    } = req.query;
    let datos = await findFavoritoByUser(id_usuario);
    let data = [];
    
    if(datos.status!=0){
        for(let i = 0 ; i < datos.length ; i++){
            let p = await findLibroById(datos[i].id_libro);
            data.push(p);
        }
            
    }else{
        data = datos;
    }
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.readByLib = async (req, res) => {
    const{
        id_libro
    } = req.query;
    let data = await findFavoritoByLib(id_libro);
    if(data.error){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.update = async (req, res) => {
    let data = req.body;
    let confirm = await updateFavorito(req.params.id, data.id_usuario, data.id_usuario);
    if(confirm.error){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}

exports.remove = async (req, res) => {
    let confirm = await removeFavorito(req.params.id);
    if(confirm.error){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}

