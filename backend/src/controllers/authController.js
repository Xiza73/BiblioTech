const { signup } = require('../dao/authDAO');
const { getRol } = require('../dao/rolDAO');
const { addUsuario } = require('../dao/usuarioDAO');
const { addPersona } = require('../dao/personaDAO');
const Usuario = require('../models/Usuario');
const formidable = require('formidable');
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
      if (data.foto){
        foto_data = Buffer.from(data.foto, "base64");
        foto_tipo = data.foto_tipo
        if (foto_data>100000){
          respuesta.err.push("La imagen debe pesar menos de 1MB")
          foto_data = null
          foto_tipo = null
        }
      }
      let usuario = await addUsuario(data.usuario,data.correo,data.contrasenia,rol.id,foto_data,foto_tipo).catch(e => {
        respuesta.err.push("error al añadir user")
      })
      if (usuario){
        await addPersona(usuario._id,data.nombre,data.apellido).catch(e => {
          respuesta.err.push("error al añadir persona")
        }).then(respuesta.msg="añadido exitosamente")
      }
      
    }else{
      respuesta.err.push("rol no existe")
    }
    res.json(respuesta);
}


exports.login = (req, res) => { 
  // find the user based on email
  const {email, password} = req.body
  User.findOne({email}, (error, user) => {
    if (error||!user) {
      return res.status(400).json({
        error: 'User with that email does not exist'
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password don\'t match'
      });
    }
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    // persist the token as 't' in cookie with expiration date
    res.cookie('t', token, {expire: new Date() + 9999})
    // return response with user and token to frontend client
    const {_id, name, email, role} = user
    return res.json({token, user: {_id, email, name, role}})
  });
}

exports.logout = (req, res) => { 
  res.clearCookie('t')
  res.json({message: "Signout success"});
};

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err,user) => {
    if(err||!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next()
  });
}