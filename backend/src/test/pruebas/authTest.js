const supertest  = require('supertest');
const {deletePersonaByIdUsuario} = require ("../../dao/personaDAO")
const {deleteUsuarioByEmail,findUsuarioByEmail} = require ("../../dao/usuarioDAO")
exports.authTest = (server) =>{
    describe("/auth pruebas para el modulo de login", function(){
        let dataRegister = {
            "usuario":"test",
            "correo":"test",
            "contrasenia":"test",
            "rol":"estudiante",
            "nombre":"test",
            "apellido":"test",
        }
        let dataLogin ={
            "correo":"test",
            "contrasenia":"test",
        }
        let dataLoginFail ={
            "correo":"test123",
            "contrasenia":"test123",
        }
        it('POST /auth/register crea un nuevo usuario', function(done){
            this.timeout(15000)
            supertest(server)
                .post('/auth/register/')
                .send(dataRegister)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end( (err,res) =>{
                    if (!err){
                        findUsuarioByEmail(dataRegister.correo).then(v => {
                            dataRegister._id = v._id
                            done()
                        })
                    }else{
                        console.log(res.body)
                        done(err)
                    }
                })
                
        })
        it('POST /auth/login prueba de login', function(done){
            this.timeout(15000)
            supertest(server)
                .post('/auth/login')
                .send(dataLogin)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err,res) =>{ 
                    if (err){
                        console.log(res.body)
                        return done(err)
                    }
                    return done()
                } )
        })
        it('POST /auth/login prueba de login con credenciales incorrectas', function(done){
            this.timeout(15000)
            supertest(server)
                .post('/auth/login')
                .send(dataLoginFail)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(403)
                .end((err,res) =>{ 
                    if (err){
                        console.log(res.body)
                        return done(err)
                    }
                    return done()
                } )
        })
        it('POST /auth/logout prueba de logout', function(done){
             supertest(server)
                .post('/auth/logout')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err,res) =>{
                    if (err){
                        console.log(res.body)
                        return done(err)
                    }
                    return done()
                } )
        })
        after(()=>{
            deletePersonaByIdUsuario(dataRegister._id)
            deleteUsuarioByEmail(dataRegister.correo)
        })
    })
}