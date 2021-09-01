const PersonaProtoype = require('./PersonaPrototype')

exports.Administrador = class extends PersonaProtoype {

     constructor(correo, nombre, permisos)
     {
        super(correo, nombre);
        this.permisos = permisos;
     }

    getAdministrador()
    {
        //se incovan los metodos de la clase Person
        this.getNombre();
        this.getid_usuario();
        
        console.log(`${this.permisos}`); 
    }
}