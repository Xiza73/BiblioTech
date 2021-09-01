const { Builder } = require("./Builder")

exports.Director = class {
    builder;
    nuevoAutor;
    nuevaCategoria;
    nuevoPais;

    constructor(autor, categoria, pais){
        this.builder = new Builder()
        this.construirLibroGenerico(autor, categoria, pais)
    }

    construirLibroGenerico(autor, categoria, pais){
        this.nuevoAutor = new Autor(autor)
        this.nuevoAutor.construirParte()
        this.nuevaCategoria = new Categoria(categoria)
        this.nuevaCategoria.construirParte()
        this.nuevoPais = new Categoria(pais)
        this.nuevoPais.construirParte()
    }

    construirLibro(){
        
    }
}