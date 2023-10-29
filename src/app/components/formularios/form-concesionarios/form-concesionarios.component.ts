import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConsesionariosModel, ConsesionariosModelUpdate } from 'src/app/models/concesionariosModel';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-concesionarios',
  templateUrl: './form-concesionarios.component.html',
  styleUrls: ['./form-concesionarios.component.css']
})
export class FormConcesionariosComponent implements OnInit{

  titulo:String = "";

  concesionario: ConsesionariosModel = {
    nombre: null,
    direccion: null,
    telefono: null,
    email: null
  }

  concesionarioUpdate: ConsesionariosModelUpdate = {
    direccion:null,
    email:null,
    estado:null,
    idConcesionario:null,
    nombre: null,
    telefono:null
  }

  isEdit:boolean = false;
  constructor(public api: ServiceService, public modularService:ModalServiceService) { }
  ngOnInit(): void {
    if(this.modularService.accion.value == "editar"){
      this.isEdit = true;
      console.log(this.modularService.concesionario)
      this.addressForm.controls['nombre'].setValue(
        this.modularService.concesionario.nombre + ''
      );
      this.addressForm.controls['direccion'].setValue(
        this.modularService.concesionario.direccion + ''
      );
      this.addressForm.controls['telefono'].setValue(
        this.modularService.concesionario.telefono + ''
      );
      this.addressForm.controls['email'].setValue(
        this.modularService.concesionario.email + ''
      );
    }
    this.titulo = this.modularService.titulo;
  }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    nombre: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.compose([
      Validators.required, Validators.pattern('^[0-9]+$')
    ])],
    email: ['', Validators.compose([
      Validators.required, Validators.email
    ])]
  });

  onSubmit(): void {
    if(!this.isEdit){
      if (this.addressForm.valid) {
        this.concesionario.nombre = this.addressForm.controls['nombre'].value;
        this.concesionario.direccion = this.addressForm.controls['direccion'].value;
        this.concesionario.telefono = parseInt(this.addressForm.controls['telefono'].value);
        this.concesionario.email = this.addressForm.controls['email'].value;
        console.log(this.concesionario)
        this.api.PostData('Concescionarios', this.concesionario).then((res) => {
          console.log(res);
          Swal.fire(
            'Registro completo',
            'Ya estás registrado en nuestro sistema...',
            'success'
          )
        }).catch((err) => {
          Swal.fire(
            'Alerta',
            err.detail,
            'error'
          )
        })
      } else {
        Swal.fire(
          'ALERTA',
          'Por favor registre el formulario de manera correcta...',
          'error'
        )
      }
    }else{
      if (this.addressForm.valid) {
        this.concesionarioUpdate.nombre = this.addressForm.controls['nombre'].value;
        this.concesionarioUpdate.direccion = this.addressForm.controls['direccion'].value;
        this.concesionarioUpdate.telefono = parseInt(this.addressForm.controls['telefono'].value);
        this.concesionarioUpdate.email = this.addressForm.controls['email'].value;
        this.concesionarioUpdate.idConcesionario = this.modularService.concesionario.idConcesionario;
        this.concesionarioUpdate.estado = this.modularService.concesionario.estado;
        console.log(this.concesionarioUpdate)
        this.api.updateData('Concescionarios', this.concesionarioUpdate.idConcesionario,this.concesionarioUpdate).then((res) => {
          console.log(res);
          Swal.fire(
            'Registro completo',
            'Ya estás registrado en nuestro sistema...',
            'success'
          )
        }).catch((err) => {
          Swal.fire(
            'Alerta',
            err.detail,
            'error'
          )
        })
      } else {
        Swal.fire(
          'ALERTA',
          'Por favor registre el formulario de manera correcta...',
          'error'
        )
      }
    }

  }
}