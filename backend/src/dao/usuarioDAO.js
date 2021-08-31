const { errorHandler } = require('../helpers/dbErrorHandler');
const Usuario = require('../models/Usuario');

exports.addUsuario =  async (usuario,contrasenia,correo,rol_id,foto_data,foto_type) => {
    const user = new Usuario({
        usuario,
        contrasenia,
        correo,        
        rol: rol_id,
        avatar: {
            data: foto_data,
            type: foto_type
        }
      });   
    console.log("hola")
    console.log(user)
     return user.save()
      
}

exports.findUsuarioByEmail = async (correo) =>{
    return Usuario.findOne({correo}).exec()
}

exports.findUsuarioById = async (id) =>{
  try{
    let data = await Usuario.findById(id).exec();
    return data;  
  }catch{
    return{
        status: 0,
        msg: "No se encuentra el usuario disponible"
    };
}

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

exports.findUsuario = async () => {
  try{         
    let data = await Usuario.find().exec();
    return data;
  }catch{
    return{
        status: 0,
        msg: "No hay Usuario"
    };
  }
} 

exports.updateUsuario = async (id,usuario,contrasenia,correo,rol_id,foto_data,foto_type) => {
  const user = new Usuario({
    usuario,
    contrasenia,
    correo,        
    rol: rol_id,
    avatar: {
        data: foto_data,
        type: foto_type
    }
  }); 
  try{
     await Usuario.findByIdAndUpdate(id,user);
      return {
          status: 1,
          msg: "Usuario actualizado correctamente"
      }; 
  }catch{
      return{
          status: 0,
          msg: "No se pudo actualizar el usuario"
      };
  }
}

exports.removeUsuario = async (id) => {
  try{
      
      await Usuario.findByIdAndDelete(id).exec(); 
      return {
          status: 1,
          msg: "Usuario eliminado correctamente"
      };
  }catch{
      return{
          status: 0,
          msg: "No se pudo eliminar el usuario"
      };
  }
}
