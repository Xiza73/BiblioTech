const { Builder } = require("./Builder");

exports.Categoria = class extends Builder {
    nombre;

    constructor(nombre){
        this.nombre = nombre
    }

    construirParte(){
        this.Save()
    }

    obtenerNombre(){
        return this.nombre
    }
}