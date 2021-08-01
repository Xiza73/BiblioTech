const Rol = require('../models/Rol');

exports.getRol = (rol) =>{
   let result = Rol.findOne({'nombre': rol}).exec()
   return result
} 