const { Schema } = require("mongoose");
const { ObserverFavoritos } = require("./observerFavoritos");

exports.Favorito = class extends Schema {
    id_usuario;
    id_libro;
    estado;
    observer;

    constructor(id_usuario, id_libro){
        this.id_usuario = id_usuario;
        this.id_libro = id_libro;
        this.estado = 0;
        observer = new ObserverFavoritos()
    }

    cambiarEstado(estado){
        this.estado = estado;
        notificarObserver();
    }

    notificarObserver(){
        this.observer.notify()
    }
}