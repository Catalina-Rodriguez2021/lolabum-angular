import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  constructor(public api:ServiceService){ }
  titulo = 'VISTA PERSONAS';

ngOnInit(){
    this.api.GetData('Personas')
  }
}
