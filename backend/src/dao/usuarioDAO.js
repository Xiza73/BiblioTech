const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt'); //https://www.npmjs.com/package/bcrypt
const saltRounds = 13
exports.addUsuario =  async (usuario,correo,contrasenia,rol_id,foto_data,foto_type) => {
    const user = new Usuario({
        usuario,
        correo,
        contrasenia: await bcrypt.hash(contrasenia, saltRounds),
        rol: rol_id,
        avatar: {
            data: foto_data,
            type: foto_type
        }
      });
   return user.save()
}