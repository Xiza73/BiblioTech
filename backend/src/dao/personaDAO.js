const Persona = require('../models/Persona')

exports.addPersona =  async (id_usuario,nombre,apellido) => {
    const person = new Persona({
        id_usuario,
        nombre,
        apellido
    })
   return person.save()
}