const { addFavorito,  findFavoritoByUser, findFavoritoByLib, findFavoritoRank, removeFavorito, updateFavorito } = require('../dao/favoritoDAO')
const {findLibroById } = require('../dao/libroDAO')

exports.create = async (req, res) => {
    let data = req.body;
    let verify = await verificar(data.id_usuario, data.id_libro)
    let confirm ;
    
    if(verify == 0){
        confirm = await addFavorito(data.id_usuario, data.id_libro);
    }else{
        return res.status(400).json({
            status: 0,
            msg: "Este libro ya esta en la lista de favoritos"
        });
    }
    if(confirm.status == 0){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);   
}
async function verificar(id_usuario,id_libro){
    let confirm = 0;
    let ver = await findFavoritoByLib(id_libro);
    console.log(ver)
    if(ver!=[]){
        for(i=0;i<ver.length;i++){
            if(ver[i].id_usuario==id_usuario){     
                console.log(id_libro)           
                confirm = 1;
                break;
            }
        }
    } 
    return confirm;
}
exports.verify  = async(req,res) => {
    let data = req.query
    let confirm = await verificar(data.id_usuario, data.id_libro)
    return res.json(confirm)
}

exports.readRank = async (req, res) => {
    const{
        cantidad
    } = req.query;
    let data = await findFavoritoRank(cantidad);
    if(data.status == 0){
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
    if(data.status == 0){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.readByLib = async (req, res) => {
    const{
        id_libro
    } = req.query;
    let data = await findFavoritoByLib(id_libro);
    if(data.status == 0){
        return res.status(400).json(data);
    }
    return res.json(data);
}

exports.update = async (req, res) => {
    let data = req.body;
    let confirm = await updateFavorito(req.params.id, data.id_usuario, data.id_libro);
    if(confirm.status == 0){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}

exports.remove = async (req, res) => {
    let data = req.body
    let confirm = await removeFavorito(data.id_usuario,data.id_libro);
    if(confirm.status == 0){
        return res.status(400).json(confirm);
    }
    return res.json(confirm);
}