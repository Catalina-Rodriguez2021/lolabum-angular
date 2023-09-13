import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  constructor(public api:ServiceService){ }
  titulo = 'VISTA VEHICULOS';

ngOnInit(){
    this.api.GetData('Vehiculoes')
  }

}
