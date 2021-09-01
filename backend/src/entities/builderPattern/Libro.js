const { Builder } = require("./Builder");

exports.Libro = class extends Builder {
    director;
    nombre;

    constructor(autor, categoria, pais, nombre){
        this.director = new Director(autor, categoria, pais);
        this.nombre = nombre;
    }
}