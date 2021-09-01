exports.ObserverFavoritos = class {
    estado;

    constructor(){}

    notify(){
        console.log("Libro actualizado!")
    }
}