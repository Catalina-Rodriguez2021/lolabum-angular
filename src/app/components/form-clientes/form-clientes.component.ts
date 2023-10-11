import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent {
  cliente = {
    identificacion:null,
    nombre1:null,
    nombre2:null,
    apellido1:null,
    apellido2:null,
    edad:null,
    correo:null,
    telefono:null
  }
  clienteUsuario = {
    idPersona: null,
    usuario:null,
    contrasena:null
  }

  constructor(public api:ServiceService){ }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    id: [null,Validators.compose([
      Validators.required,Validators.pattern('^[0-9]+$')
    ])],
    usuario:[null,Validators.compose([
      Validators.required,Validators.pattern('^[a-zA-Z0-9]+$')
    ])],
    nombre: [null,Validators.required],
    nombre2:null,
    apellido:[null,Validators.required],
    apellido2:[null,Validators.required],
    telefono: [null,Validators.compose([
      Validators.required,Validators.pattern('^[0-9]+$')
    ])],
    edad: [null,Validators.compose([
      Validators.required,Validators.pattern('^[0-9]+$')
    ])],
    correo: [null,Validators.compose([
      Validators.required,Validators.email
    ])],
    password: [null]
  });

  onSubmit(): void {

    if (this.addressForm.valid) {
      this.cliente.identificacion = this.addressForm.controls['id'].value,
      this.cliente.nombre1 = this.addressForm.controls['nombre'].value,
      this.cliente.nombre2 = this.addressForm.controls['nombre2'].value,
      this.cliente.apellido1 = this.addressForm.controls['apellido'].value,
      this.cliente.apellido2 = this.addressForm.controls['apellido2'].value,
      this.cliente.telefono = this.addressForm.controls['telefono'].value,
      this.cliente.edad = this.addressForm.controls['edad'].value,
      this.cliente.correo = this.addressForm.controls['correo'].value,
      console.log(this.cliente)

      this.api.PostData('Personas',this.cliente).then((res)=>{
          console.log(res),
          this.clienteUsuario.idPersona = res.idPersona,
          this.clienteUsuario.usuario = this.addressForm.controls['usuario'].value,
          this.clienteUsuario.contrasena = this.addressForm.controls['password'].value
          console.log(this.clienteUsuario);
          this.api.PostData('Clientes',this.clienteUsuario).then((res)=>{
            console.log(res)
          })
      })
    }
  }
}
