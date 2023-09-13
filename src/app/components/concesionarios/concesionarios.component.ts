import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-concesionarios',
  templateUrl: './concesionarios.component.html',
  styleUrls: ['./concesionarios.component.css']
})
export class ConcesionariosComponent  implements OnInit {

  constructor(public api:ServiceService){ }
  titulo = 'VISTA CONCESIONARIOS';

ngOnInit(){
    this.api.GetData('Concescionarios')
  }
}

