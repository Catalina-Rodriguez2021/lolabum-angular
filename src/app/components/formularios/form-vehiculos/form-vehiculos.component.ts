import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { VehiculosModel, VehiculosModelUpdate } from 'src/app/models/vehiculosModel';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-vehiculos',
  templateUrl: './form-vehiculos.component.html',
  styleUrls: ['./form-vehiculos.component.css']
})
export class FormVehiculosComponent implements OnInit{

  constructor(public api:ServiceService, public modularService:ModalServiceService){}
  categorias = [];
  concescionarios = [];
  titulo:String = "";
  isEdit:boolean = false;

  vehiculo:VehiculosModel = {
    nombre:null,
    precio:null,
    idCategoria:null,
    idConcesionario:null
  };

  vehiculoUpdate:VehiculosModelUpdate = {
    estado:null,
    idCategoria:null,
    idConcesionario:null,
    idVehiculos:null,
    nombre:null,
    precio:null
  }

  ngOnInit(): void {
    console.log(this.modularService.vehiculos);
    this.titulo = this.modularService.titulo;
    if(this.modularService.accion.value == "editar"){
      this.isEdit = true;
      this.addressForm.controls['nombreVehiculo'].setValue(
        this.modularService.vehiculos.nombre + ''
      );
      this.addressForm.controls['categoria'].setValue(
        this.modularService.vehiculos.idCategoria
      );
      this.addressForm.controls['precio'].setValue(
        this.modularService.vehiculos.precio + ''
      );
      this.addressForm.controls['consecionario'].setValue(
        this.modularService.vehiculos.idConcesionario
      );
    }
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
    nombreVehiculo: ['', Validators.required],
    categoria: [0, Validators.required],
    precio: ['',Validators.compose([
      Validators.required,Validators.pattern('^[0-9]+$')
    ])],
    consecionario: [0, Validators.required],
  });

  onSubmit(): void {
    if(!this.isEdit){
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
    }else{
      if(this.addressForm.valid){
        this.vehiculoUpdate.nombre = this.addressForm.controls['nombreVehiculo'].value;
        this.vehiculoUpdate.precio = this.addressForm.controls['precio'].value;
        this.vehiculoUpdate.idCategoria = this.addressForm.controls['categoria'].value;
        this.vehiculoUpdate.idConcesionario = this.addressForm.controls['consecionario'].value;
        this.vehiculoUpdate.estado = this.modularService.vehiculos.estado;
        this.vehiculoUpdate.idVehiculos = this.modularService.vehiculos.idVehiculos;
        console.log(this.vehiculoUpdate)
        this.api.updateData('Vehiculoes',this.vehiculoUpdate.idVehiculos,this.vehiculoUpdate).then((res)=>{
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
}
