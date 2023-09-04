import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  constructor(public api:ServiceService){ }
  titulo = 'VISTA FACTURA';


  mostrarFacturas(){
    this.api.GetData('Facturas')
  }
  ngOnInit(){
    this.mostrarFacturas();
  }
}
