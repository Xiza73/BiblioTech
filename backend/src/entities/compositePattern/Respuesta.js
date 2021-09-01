exports.Respuesta = class extends Comentario {
    constructor(respuesta){
        super();
        this.setComentario(respuesta)
    }

    contarComentarios(){
        return 1;
    }
}