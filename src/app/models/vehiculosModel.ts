export class VehiculosModel{
    nombre:String;
    precio:String;
    idCategoria:number;
    idConcesionario:number
}

export class VehiculosModelUpdate{
    nombre:String;
    precio:String;
    idCategoria:number;
    idConcesionario:number;
    idVehiculos:number
    estado:boolean
}