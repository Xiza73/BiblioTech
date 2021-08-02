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

    return person.findOne({id_usuario}).exec()
 }
exports.deletePersonaByIdUsuario =  async (id_usuario) => {

   return person.deleteOne({id_usuario}).exec()
}