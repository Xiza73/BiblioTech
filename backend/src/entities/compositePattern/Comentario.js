const { Schema } = require("mongoose");

exports.Comentario = class extends Schema {
    comentario;
    cajaComentarios;
    cantidadComentarios;

    constructor(comentario) {
        super();
        this.setComentario(comentario);
    }

    getComentario(){
        return this.comentario;
    }

    setComentario(comentario){
        this.comentario = comentario
    }

    insertComentario(comentario){
        this.cajaComentarios.push(comentario);
    }

    deleteComentario(comentario){
        this.cajaComentarios.slice(this.cajaComentarios.indexOf(comentario), 1);
    }

    getComentarios(){
        return this.cajaComentarios;
    }

    contarComentarios(){
        this.cantidadComentarios = 0;
        this.cajaComentarios.values.forEach(e => {
            this.cantidadComentarios += parseInt(e.contarComentarios())
        })

        return this.cantidadComentarios;
    }
}