import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {
  constructor(public api:ServiceService){ }
  titulo = 'VISTA PERSONAS';


  mostrarPersonas(){
    this.api.GetData('Personas')
  }
  ngOnInit(){
    this.mostrarPersonas();
  }
}
