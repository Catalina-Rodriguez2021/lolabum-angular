import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent  implements OnInit {

  constructor(public api:ServiceService){ }
  titulo = 'VISTA CATEGORIA';

ngOnInit(){
    this.api.GetData('Categoriums')
  }

}
