export interface AuthResponse{
    err?: string;
    msg?: string;
    token?: string;
    user: Usuario;
    ok?:boolean;
}

export interface Usuario{
    _id: string;
    correo:string;
    nombre:string;
    rol:string;
    usuario?:string;
}
export interface NuevoUser{
    name: string;
    correo: string;
    _id: string;
    rol:string
}
export interface Libros {
    imagen:    Imagen;
    _id:       string;
    arc_libro: string;
    titulo:    string;
    autor:     string;
    categoria: string;
    pais:      string;
    fch_pub:   Date;
    __v:       number;
}

export interface Imagen {
    data: null;
}



