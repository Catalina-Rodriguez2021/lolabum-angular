export class PersonasModel{
    identificacion:number;
    nombre1:String;
    nombre2:any;
    apellido1:String;
    apellido2:String;
    edad:number;
    correo:String;
    telefono:number
}

export class PersonasModelUpdate{
    idPersona:number;
    identificacion:number;
    nombre1:String;
    nombre2:any;
    apellido1:String;
    apellido2:String;
    edad:number;
    correo:String;
    telefono:number;
    estado:boolean
}