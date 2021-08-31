const { errorHandler } = require('../helpers/dbErrorHandler');
const Rol = require('../models/Rol');

exports.getRol = async (rol) =>{
   try{
      let result = await Rol.findOne({'nombre' : rol}).exec();
      return result;
   }
   catch{ 
      return false;
  }
} 