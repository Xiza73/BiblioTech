const { Builder } = require("./Builder");

exports.Pais = class extends Builder {
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