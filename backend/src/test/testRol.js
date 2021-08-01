const { constants } = require('fs');
const {getRol} = require('../dao/rolDAO');

exports.ejecutarPruebas = async () =>{ 
    pruebaGetRol()
    pruebaGetRol2()
}

async function pruebaGetRol(){
    let rol = await getRol("estudiante")
    console.log(rol)
}
async function pruebaGetRol2(){
    const rol = await getRol("estudiante2").catch(e => console.log(e))
    console.log(rol)
}