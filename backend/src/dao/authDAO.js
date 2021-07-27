const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');
const Persona = require('../models/Persona')
const { errorHandler } = require('../helpers/dbErrorHandler');
//const jwt = require('jsonwebtoken');
//const expressJwt = require('express-jwt');
const _ = require('lodash');
const fs = require('fs');


exports.signup = async (param) => {
    const { usuario,
            correo,
            contrasenia,
            rol,
            nombre,
            apellido } = param.fields
    let role, res
    await Rol.findOne({'nombre': rol}, (err, data) => {
        if(err){
            res ? null : res = {
                error: "Error al leer datos"
            }
        }
        role = data;
    })
    if(role){
        const user = new Usuario({
            usuario,
            correo,
            contrasenia,
            rol: role._id
        });
        const person = new Persona({
            usuario: user._id,
            nombre,
            apellido
        })
        if (param.files.avatar) {
            if (param.files.avatar.size > 1000000) {
                res ? null : res = {
                    error: "La imagen debe pesar menos de 1MB"
                }
            }
            user.avatar.data = fs.readFileSync(param.files.avatar.path)
            user.avatar.contentType = param.files.avatar.type
        }
        await user.save((err, data) => {
            if (err) {
                res ? null : res = {
                    err: errorHandler(err),
                    status: 0,
                    msg: "Error al insertar datos"
                }
            }
            res ? null : res = {
                status: 1,
                msg: "Registrado Correctamente"
            }
        })
        await person.save((err, data) => {
            if (err) {
                return {
                    error: errorHandler(err),
                    status: 0,
                    msg: "Error al insertar datos"
                }
                console.log(res);
            }
            res ? null : res = {
                status: 1,
                msg: "Registrado Correctamente"
            }
        })
    }
}