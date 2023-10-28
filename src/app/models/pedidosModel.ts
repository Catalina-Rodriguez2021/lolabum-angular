export class PedidosModel{
    pedido:String;
    idCliente:number;
    idVehiculos:number
}

export class PedidoUpdateModel{
    idPedido: number;
    pedido: string;
    idCliente: number;
    idVehiculos: number;
    idFactura: any;
    estado: boolean
}