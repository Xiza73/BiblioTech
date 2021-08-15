const Favorito = require('../models/Favorito');

exports.addFavorito = async (id_usuario,id_libro) => {
    const fav = new Favorito({
            id_usuario,
            id_libro        
    });
    try{
        await fav.save();
        return {
            status: 1,
            msg: "Libro añadido a la lista de favoritos correctamente"
        };
    }catch{
        return{
            status: 0,
            msg: "Error al añadir libro a la lista de favoritos"
        };
    }
}

exports.findFavoritoByUser = async (usuario) => {
    try{         
        let data = await Favorito.find({"id_usuario" : usuario}).exec();
        return data;
    }catch{
        return{
            status: 0,
            msg: "No tiene libros favoritos"
        };
    }
} 

exports.findFavoritoByLib = async (libro) => {  // para que los admins miren la popularidad de un libro en especifico 
    try{         
        let data = await Favorito.find({"id_libro" : libro}).exec();
        return data;
    }catch{
        return{
            status: 0,
            msg: "Ningun usuario tiene como favorito a este libro"
        };
    }
} 

exports.findFavoritoRank = async (cant) => {
    try{
        let data;
        if(cant>0)
            data = await Favorito.aggregate([
                //{
                //    '$match' : {} //para poner una condicion como un where en sql
                //},
                {
                    '$group' : 
                    {  
                                '_id': '$id_libro',
                                'count'  :  { 
                                    '$sum': 1
                                }
                    
                    }
                },               
                {
                    '$sort' : {'count': -1}
                },
                {
                    '$limit' : Number(cant)
                }
            ]).exec();
        else{
            data = [];
        }
        return data;
    }catch {
        return{
            status: 0,
            msg: "No hay ningun libro favorito"
        };
    }
}

exports.removeFavorito = async (id) => {
    try{
        await Favorito.findByIdAndDelete(id).exec(); 
        return {
            status: 1,
            msg: "Se elimino el libro de la lista de favoritos correctamente"
        };
    }catch{
        return{
            status: 0,
            msg: "No se pudo eliminar el libro de la lista de favoritos"
        };
    }
}

exports.updateFavorito = async (id,id_usuario,id_libro) => {
    const lib = new Libro({
        id_usuario,
        id_libro
    });
    try{
       await Favorito.findByIdAndUpdate(id,lib);
        return {
            status: 1,
            msg: "Favorito actualizado correctamente"
        }; 
    }catch{
        return{
            status: 0,
            msg: "No se pudo actualizar el Favorito"
        };
    }
}


