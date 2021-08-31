const { errorHandler } = require('../helpers/dbErrorHandler');
const Comentario = require('../models/Comentario');
var mongoose = require('mongoose')
exports.addComentario = async (comentario,id_usuario,id_libro) => {
    let id_respuesta  = []
    let es_comentario = 1;
    const com = new Comentario({
            comentario,
            id_usuario,
            id_libro,
            es_comentario,
            id_respuesta       
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


exports.addRespuesta = async (comentario,id_us,id) => {
    try{
        let come = await Comentario.findById(id);
        const id_respuesta  = [];
        const es_comentario = 0;
        const id_libro = come.id_libro;
        const id_usuario = id_us;
        console.log(id)
        const com = new Comentario({
            comentario,
            id_usuario,
            id_libro,
            id_respuesta,
            es_comentario
        });
        console.log(comentario)
        let respuesta = await com.save();
        come.id_respuesta.push(respuesta)
        await Comentario.updateOne({_id: id},come);
        return {
            status: 1,
            msg: "Respuesta añadida correctamente"
        }; 
    }catch{
        return{
            status: 0,
            msg: "No se pudo añadir la respuesta"
        };
    }
}

exports.findComentarioByCom = async (comentario)  => {
    try{        
        let ti = new RegExp ('.*'+comentario+'.*','i')        
       // console.log(t);
        let data = await Libro.find({"comentario" : ti }).populate({
            path: "id_respuesta"
        }).populate({path: "id_usuario"}).exec();       
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
        let data = await Comentario.find({"id_usuario" : usuario}).populate({
            path: "id_respuesta"
        }).populate({path: "id_usuario"}).exec();
        return data;
    }catch{
        return{
            status: 0,
            msg: "No tiene Comentarios"
        };
    }
} 

/*exports.findComentarioByLib = async (libro) => {   
    try{         
        let data = await Comentario.find({"id_libro" : libro}).exec();
        return data;
    }catch{
        return{
            status: 0,
            msg: "Ningun usuario tiene como comentarios en este libro"
        };
    }
} */

exports.findComentarioAnt = async (libro) => {
    try{
        let data;            
            data = await Comentario
            .aggregate([
                {
                    '$match': {
                      'id_libro':  mongoose.Types.ObjectId(libro),
                      'es_comentario': 1
                    }
                },
                {
                    '$lookup': {
                      'from': 'comentarios', 
                      'localField': 'id_respuesta', 
                      'foreignField': '_id', 
                      'as': 'respuesta'
                    }
                },   
                {
                    '$lookup': {
                      'from': 'personas', 
                      'localField': 'id_usuario', 
                      'foreignField': 'id_usuario', 
                      'as': 'nombre'
                    }
                },
                {
                    '$unwind': {
                        'path': '$nombre'
                    }
                }, 
                {
                    '$addFields': {
                        'nombre': '$nombre.nombre', 
                        'apellido': '$nombre.apellido'
                    }
                },     
                {
                    '$sort' : {'createdAt': -1}
                }
                
            ])
            .exec();
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
        
            data = await Comentario
            .aggregate([
                {
                    '$match': {
                      'id_libro':  mongoose.Types.ObjectId(libro),
                      'es_comentario': 1
                    }
                },
               /* {
                    '$lookup': {
                      'from': 'personas', 
                      'localField': 'id_usuario', 
                      'foreignField': 'id_usuario', 
                      'as': 'nombre'
                    }
                },
                {
                    '$unwind': {
                        'path': '$nombre'
                    }
                }, 
                {
                    '$addFields': {
                        'nombre': '$nombre.nombre', 
                        'apellido': '$nombre.apellido'
                    }
                },   
               {
                    '$lookup': {
                      'from': 'comentarios', 
                      'localField': 'id_respuesta', 
                      'foreignField': '_id', 
                      'as': 'respuesta'
                    }                                     
                }, */  
                
                {
                    '$graphLookup': {
                       'from': 'comentarios',
                       'startWith': '$id_respuesta',
                       'connectFromField': 'id_respuesta',
                       'connectToField': '_id',
                       'as': 'res'
                    },
                                
                 },// crea un array  con las respuestas , problema intentar poner nombre por respuesta dentro del array
                 {'$addFields': {
                    'name': 'hello'
                    
                }  },
                 {
                 
                    '$lookup': {
                        'from': 'personas', 
                        'localField': 'res.id_usuario', 
                        'foreignField': 'id_usuario', 
                        'as': 'nombre'
                    }
                 },
                  
                {
                    '$sort' : {'createdAt': 1}
                }
                
            ])
            .exec();
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

exports.updateComentario = async (id,comentario,id_usuario,id_libro,id_respuesta) => {
    const lib = new Comentario({
        comentario,
        id_usuario,
        id_libro,
        id_respuesta
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
