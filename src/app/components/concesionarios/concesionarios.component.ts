import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-concesionarios',
  templateUrl: './concesionarios.component.html',
  styleUrls: ['./concesionarios.component.css']
})
export class ConcesionariosComponent {
  constructor(public api:ServiceService){ }
  titulo = 'VISTA CONCESIONARIOS';


  mostrarConcesionarios(){
    this.api.GetData('Concescionarios')
  }
  ngOnInit(){
    this.mostrarConcesionarios();
  }
}
