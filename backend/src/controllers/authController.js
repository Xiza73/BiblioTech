const { getRol } = require('../dao/rolDAO');
const { addUsuario, findUsuarioWithRole } = require('../dao/usuarioDAO');
const { addPersona } = require('../dao/personaDAO');
const Usuario = require('../models/Usuario');
const formidable = require('formidable');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const e = require('express');
const saltRounds = 13

exports.register = async (req, res) => {
  let data = req.body
  let rol = await getRol(data.rol)
  let respuesta = {
    err: [],
    msg: null
  }
  if (rol) {
    let foto_data = null
    let foto_tipo = null
    if (data.foto) {
      foto_data = Buffer.from(data.foto, "base64");
      foto_tipo = data.foto_tipo
      if (foto_data > 100000) {
        respuesta.err.push("La imagen debe pesar menos de 1MB")
        foto_data = null
        foto_tipo = null
      }
    }

    let usuario = await addUsuario(data.usuario, data.correo, await bcrypt.hash(data.contrasenia, saltRounds), rol.id, foto_data, foto_tipo).catch(e => {
      respuesta.err.push("error al añadir user")
      res.status(422)
    })
    if (usuario) {
      await addPersona(usuario._id, data.nombre, data.apellido).catch(e => {
        respuesta.err.push("error al añadir persona")
        res.status(422)
      }).then(()=>{
        respuesta.msg = "añadido exitosamente"
        res.status(201)
      } )
    }

  } else {
    respuesta.err.push("rol no existe")
    res.status(422)
  }
  res.json(respuesta);

}


exports.login = async (req, res) => {
  let respuesta = {
    err: [],
    msg: null
  }
  // find the user based on email
  const loginData = req.body
  let usuario = await findUsuarioWithRole(loginData.correo).catch(e => {
    console.log(e.message)
    respuesta.err.push("error de BD en usuario")
  })
  if (usuario && usuario.length > 0) {
    usuario = usuario[0] //es que la wbd de mongo me devuelve un array
    if (await bcrypt.compare(loginData.contrasenia,usuario.contrasenia)) {
      const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET)
      // persist the token as 't' in cookie with expiration date
      res.cookie('t', token, { expire: new Date() + 9999 })
      // return response with user and token to frontend client
      respuesta.token = token
      respuesta.user = {
        _id : usuario._id,
        correo : usuario.correo,
        nombre : usuario.nombre + ' ' + usuario.apellido,
        rol : usuario.rol,
      }
      respuesta.msg="Logueo exitoso"
      res.status(200)
    }else{
      respuesta.err.push("Contrasenia incorrecta")
      res.status(403)
    }
   
  } else {
    respuesta.err.push("Usuario no encontrado")
    res.status(403)
  }
  return res.json(respuesta)

}


exports.logout = (req, res) => {
  res.clearCookie('t')
  res.json({ message: "Signout success" });
  res.status(200)
};

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next()
  });
}