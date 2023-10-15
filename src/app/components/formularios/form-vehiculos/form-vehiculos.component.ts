import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { VehiculosModel } from 'src/app/models/vehiculosModel';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-vehiculos',
  templateUrl: './form-vehiculos.component.html',
  styleUrls: ['./form-vehiculos.component.css']
})
export class FormVehiculosComponent implements OnInit{

  constructor(public api:ServiceService){}
  categorias = [];
  concescionarios = []
  vehiculo:VehiculosModel = {
    nombre:null,
    precio:null,
    idCategoria:null,
    idConcesionario:null
  };

  ngOnInit(): void {
    this.api.GetData("Categoriums").then((res)=>{
      this.categorias = res
      console.log(this.categorias)
    })

    this.api.GetData("Concescionarios").then((res)=>{
      this.concescionarios = res
      console.log(this.concescionarios)
    })
  }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    nombreVehiculo: [null, Validators.required],
    categoria: [null, Validators.required],
    precio: [null,Validators.compose([
      Validators.required,Validators.pattern('^[0-9]+$')
    ])],
    consecionario: [null, Validators.required],
  });

  onSubmit(): void {
    if(this.addressForm.valid){
      this.vehiculo.nombre = this.addressForm.controls['nombreVehiculo'].value;
      this.vehiculo.precio = this.addressForm.controls['precio'].value;
      this.vehiculo.idCategoria = this.addressForm.controls['categoria'].value;
      this.vehiculo.idConcesionario = this.addressForm.controls['consecionario'].value;
      console.log(this.vehiculo)
      this.api.PostData('Vehiculoes',this.vehiculo).then((res)=>{
        console.log(res);
        Swal.fire(
          'Registro completo',
          'Ya estás registrado en nuestro sistema...',
          'success'
        )
      }).catch((err)=>{
        Swal.fire(
          'Alerta',
          err,
          'error'
        )
      })
    }else{
      Swal.fire(
        'ALERTA',
        'Por favor registre el formulario de manera correcta...',
        'error'
      )
    }
  }
}
