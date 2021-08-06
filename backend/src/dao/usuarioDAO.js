const Usuario = require('../models/Usuario');
exports.addUsuario =  async (usuario,correo,contrasenia,rol_id,foto_data,foto_type) => {
    const user = new Usuario({
        usuario,
        correo,
        contrasenia,
        rol: rol_id,
        avatar: {
            data: foto_data,
            type: foto_type
        }
      });   
   try{
      user.save()
      return {
        status: 1,
        msg: "usuario insertado correctamente"
      }
    }catch{
      return{
          status: 0,
          msg: "Error al insertar usuario"
      }
    }
}

exports.findUsuarioByEmail = async (correo) =>{
    return Usuario.findOne({correo}).exec()
}
exports.deleteUsuarioByEmail = (correo) =>{
  return Usuario.deleteOne({correo}).exec()
}
exports.findUsuarioWithRole = async (correo) => {
    return Usuario.aggregate( 
        [
            {
              '$match': {
                'correo': correo
              }
            }, {
              '$lookup': {
                'from': 'rols', 
                'localField': 'rol', 
                'foreignField': '_id', 
                'as': 'rol'
              }
            }, {
              '$unwind': {
                'path': '$rol'
              }
            }, {
              '$addFields': {
                'rol': '$rol.nombre'
              }
            }, {
              '$lookup': {
                'from': 'personas', 
                'localField': '_id', 
                'foreignField': 'id_usuario', 
                'as': 'nombre'
              }
            }, {
              '$unwind': {
                'path': '$nombre'
              }
            }, {
              '$addFields': {
                'nombre': '$nombre.nombre', 
                'apellido': '$nombre.apellido'
              }
            }
          ]
      ).exec()
}

