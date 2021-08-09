const Libro = require('../models/Libro');

exports.addLibro = async (arc_libro,titulo,autor,categoria,pais,fch_pub,foto_data,foto_type) => {
    const lib = new Libro({
        arc_libro,
        titulo,
        autor,
        categoria,
        pais,
        fch_pub,
        imagen:{
            data: foto_data,
            type: foto_type
        }
    });
    try{
        await lib.save();
        return {
            status: 1,
            msg: "Libro insertado correctamente"
        };
    }catch{
        return{
            status: 0,
            msg: "Error al insertar libro"
        };
    }
}

exports.findLibro = async () => {
    try{         
        let data = await Libro.find().exec();
        return data;
    }catch{
        return{
            status: 0,
            msg: "No hay libros disponibles"
        };
    }
} 

exports.findLibroByCat = async (cat, cant) => {
    try{
        let data;
        if(cant>0)
            data = await Libro.find({categoria : cat}).limit(Number(cant)).exec();
        else{
            data = [];
        }
        return data;
    }catch {
        return{
            status: 0,
            msg: "No hay libros disponibles"
        };
    }
}

exports.findLibroByTitle = async (title) => {
    try{
        let data = await Libro.find({ titulo: title }).exec();        
        return data
    }catch {
        return{
            status: 0,
            msg: "No hay libros disponibles"
        };
    }
}

exports.findLibroById = async (id) => {
    try{
        let data = await Libro.findById(id).exec();
        return data;  
    }catch{
        return{
            status: 0,
            msg: "No esta el libro disponible"
        };
    }
}

exports.removeLibro = async (id) => {
    try{
        await Libro.findByIdAndDelete(id).exec(); 
        return {
            status: 1,
            msg: "Libro eliminado correctamente"
        };
    }catch{
        return{
            status: 0,
            msg: "No se pudo eliminar el libro"
        };
    }
}

exports.updateLibro = async (id,arc_libro,titulo,autor,categoria,pais,fch_pub,foto_data,foto_type) => {
    const lib = new Libro({
        arc_libro,
        titulo,
        autor,
        categoria,
        pais,
        fch_pub,
        imagen:{
            data: foto_data,
            type: foto_type
        }
    });
    try{
       await Libro.findByIdAndUpdate(id,lib);
        return {
            status: 1,
            msg: "Libro actualizado correctamente"
        }; 
    }catch{
        return{
            status: 0,
            msg: "No se pudo actualizar el libro"
        };
    }
}