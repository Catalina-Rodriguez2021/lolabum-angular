import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent {
  constructor(public api:ServiceService){ }
  titulo = 'VISTA VEHICULOS';


  mostrarVehiculos(){
    this.api.GetData('Vehiculoes')
  }
  ngOnInit(){
    this.mostrarVehiculos();
  }
}
