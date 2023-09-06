import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit{
  constructor(public api:ServiceService){ }
  titulo = 'VISTA PEDIDOS';


  mostrarPedidoes(){
    this.api.GetData('Pedidoes')
  }

  mostrarPedidoesConDatos(){
    this.api.GetData('VistaPedidoConDato')
  }
  ngOnInit(){
    this.mostrarPedidoes();
    this.mostrarPedidoesConDatos();
  }
}
