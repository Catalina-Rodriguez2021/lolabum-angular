import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit{
constructor(public api:ServiceService){ }
titulo = 'VISTA EMPLEADOS';


mostrarEmpleados(){
  this.api.GetData('Empleadoes')
}

mostrarEmpleadosConDatos(){
  this.api.GetData('VistaEmpleadoConDato')
}
ngOnInit(){
  this.mostrarEmpleados();
  this.mostrarEmpleadosConDatos();
}
}
