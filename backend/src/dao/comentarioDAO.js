const Comentario = require('../models/Comentario');
var mongoose = require('mongoose')
exports.addComentario = async (comentario,id_usuario,id_libro) => {
    const com = new Comentario({
            comentario,
            id_usuario,
            id_libro        
    });
    try{
        await com.save();
        return {
            status: 1,
            msg: "Comentario añadido correctamente"
        };
    }catch{
        return{
            status: 0,
            msg: "Error al añadir Comentario"
        };
    }
}

exports.findComentarioByCom = async (comentario)  => {
    try{        
        let ti = new RegExp ('.*'+comentario+'.*','i')        
       // console.log(t);
        let data = await Libro.find({"comentario" : ti }).exec();        
        return data
    }catch {
        return{
            status: 0,
            msg: "No hay comentarios disponibles"
        };
    }
}

exports.findComentarioByUser = async (usuario) => { // para que los admins miren la popularidad de un libro en especifico
    try{         
        let data = await Comentario.find({"id_usuario" : usuario}).exec();
        return data;
    }catch{
        return{
            status: 0,
            msg: "No tiene Comentarios"
        };
    }
} 

exports.findComentarioByLib = async (libro) => {   
    try{         
        let data = await Comentario.find({"id_libro" : libro}).exec();
        return data;
    }catch{
        return{
            status: 0,
            msg: "Ningun usuario tiene como comentarios en este libro"
        };
    }
} 

exports.findComentarioAnt = async (libro) => {
    try{
        let data;            
            data = await Comentario.aggregate([
                {
                    '$match': {
                      'id_libro':  mongoose.Types.ObjectId(libro)
                    }
                },
                               
                {
                    '$sort' : {'createdAt': -1}
                }
                
            ]).exec();
        return data;
    }catch {
        return{
            
            status: 0,
            msg: "No hay ningun comentario"
        };
    }
}
exports.findComentarioNew = async (libro) => {
    try{
        let data;
        
            data = await Comentario.aggregate([
                {
                    '$match' : {"id_libro" : mongoose.Types.ObjectId(libro)} //para poner una condicion como un where en sql
                },
                               
                {
                    '$sort' : {'createdAt': 1}
                },
                
            ]).exec();
        
        return data;
    }catch {
        return{
            status: 0,
            msg: "No hay ningun comentario"
        };
    }
}
exports.removeComentario = async (id) => {
    try{
        await Comentario.findByIdAndDelete(id).exec(); 
        return {
            status: 1,
            msg: "Se elimino el comentario correctamente"
        };
    }catch{
        return{
            status: 0,
            msg: "No se pudo eliminar el comentario"
        };
    }
}

exports.updateComentario = async (id,comentario,id_usuario,id_libro) => {
    const lib = new Comentario({
        comentario,
        id_usuario,
        id_libro
    });
    try{
       await Comentario.findByIdAndUpdate(id,lib);
        return {
            status: 1,
            msg: "Comentario actualizado correctamente"
        }; 
    }catch{
        return{
            status: 0,
            msg: "No se pudo actualizar el comentario"
        };
    }
}


