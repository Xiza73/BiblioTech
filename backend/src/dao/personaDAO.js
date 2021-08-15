const Persona = require('../models/Persona')

exports.addPersona =  async (id_usuario,nombre,apellido) => {
    const person = new Persona({
        id_usuario,
        nombre,
        apellido
    })
   return person.save()
}
exports.getPersonaByIdUsuario =  async (id_usuario) => {

    return Persona.findOne(id_usuario).exec()
 }
exports.deletePersonaByIdUsuario =  async (id_usuario) => {
    
    return Persona.deleteOne({"id_usuario" : id_usuario}).exec()
}