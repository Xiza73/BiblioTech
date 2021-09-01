const { Schema } = require('mongoose');

exports.PersonaProtoype = class extends Schema {
     constructor(correo, nombre) {
        this.correo = correo;
        this.nombre   = nombre;
     }

     getid_usuario()
     {
        console.log(`Mi correo es ${this.correo}`);
     }

     getNombre()
     {
        console.log(`Mi nombre es ${this.nombre}`);
     }
}