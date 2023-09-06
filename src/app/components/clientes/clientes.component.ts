import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{
  constructor(public api:ServiceService){ }
  titulo = 'VISTA CLIENTES';


  mostrarClientes(){
    this.api.GetData('Clientes')
  }

  mostrarClientesConDatos(){
    this.api.GetData('VistaClienteConDato')
  }
  ngOnInit(){
    this.mostrarClientes();
    this.mostrarClientesConDatos();
  }
}
