export interface AuthResponse{
    err?: string;
    msg?: string;
    token?: string;
    user?: Usuario;
    ok?:boolean;
}

export interface Usuario{
    _id?: string;
    correo?:string;
    nombre?:string;
    rol?:string;
}