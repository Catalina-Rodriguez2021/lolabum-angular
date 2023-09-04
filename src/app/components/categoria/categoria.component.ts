import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{
  constructor(public api:ServiceService){ }
  titulo = 'VISTA CATEGORIA';


  mostrarCategoria(){
    this.api.GetData('Categoriums')
  }
  ngOnInit(){
    this.mostrarCategoria();
  }
}
