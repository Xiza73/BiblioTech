const Libro = require('../models/Libro');

exports.addLibro = async (arc_libro,titulo,autor,genero,pais,fch_pub,foto_data,foto_type) => {
    const lib = new Libro({
        arc_libro,
        titulo,
        autor,
        genero,
        pais,
        fch_pub,
        imagen:{
            data: foto_data,
            type: foto_type
        }
    });
    try{
        lib.save();
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
        return Libro.find().exec();
    }catch{
        return{
            status: 0,
            msg: "No hay libros disponibles"
        };
    }
} 

exports.findLibroByCat = async (genero, cant) => {
    try{
        return Libro.find({genero}).limit(cant).exec();
    }catch {
        return{
            status: 0,
            msg: "No hay libros disponibles"
        };
    }
}

exports.findLibroByTitle = async (titulo) => {
    try{
        return Libro.find({titulo}).exec();
    }catch {
        return{
            status: 0,
            msg: "No hay libros disponibles"
        };
    }
}

exports.findLibroById = async (id) => {
    try{
        return Libro.findById(id).exec(); 
    }catch{
        return{
            status: 0,
            msg: "No esta el libro disponible"
        };
    }
}

exports.removeLibro = async (id) => {
    try{
        Libro.findByIdAndDelete(id).exec(); 
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

exports.updateLibro = async (id,arc_libro,titulo,autor,genero,pais,fch_pub,foto_data,foto_type) => {
    const lib = new Libro({
        arc_libro,
        titulo,
        autor,
        genero,
        pais,
        fch_pub,
        imagen:{
            data: foto_data,
            type: foto_type
        }
    });
    try{
        Libro.findByIdAndUpdate(id,lib);
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