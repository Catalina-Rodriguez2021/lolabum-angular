import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ClientesModel } from 'src/app/models/clientesModel';
import { PersonasModel } from 'src/app/models/personalsModel';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent {

  DataPersona: PersonasModel = {
    identificacion:null,
    nombre1:null,
    nombre2:null,
    apellido1:null,
    apellido2:null,
    edad:null,
    correo:null,
    telefono:null
  }
  DataCliente: ClientesModel = {
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
    password: [null, Validators.required]
  });

  onSubmit(): void {
    //validacion del fomrulario
    if (this.addressForm.valid) {
      //instanciar objeto personsa con los datos del formulario
      this.DataPersona.identificacion = this.addressForm.controls['id'].value,
      this.DataPersona.nombre1 = this.addressForm.controls['nombre'].value,
      this.DataPersona.nombre2 = this.addressForm.controls['nombre2'].value,
      this.DataPersona.apellido1 = this.addressForm.controls['apellido'].value,
      this.DataPersona.apellido2 = this.addressForm.controls['apellido2'].value,
      this.DataPersona.telefono = this.addressForm.controls['telefono'].value,
      this.DataPersona.edad = this.addressForm.controls['edad'].value,
      this.DataPersona.correo = this.addressForm.controls['correo'].value,
      console.log(this.DataPersona)
      //cuando se instancia, enviar personal al metodo post de personas
      this.api.PostData('Personas',this.DataPersona).then((res)=>{
          console.log(res),
          //cuando se complete la promesa correctamente ahora se debe agregar un cliente a esa persona
          //se instancia los datos del cliente con los datos del formulario
          this.DataCliente.idPersona = res.idPersona,
          this.DataCliente.usuario = this.addressForm.controls['usuario'].value,
          this.DataCliente.contrasena = this.addressForm.controls['password'].value
          console.log(this.DataCliente);
          //enviar datos a post de clientes
          this.api.PostData('Clientes',this.DataCliente).then((res)=>{
            console.log(res)
            //aletar registro exitoso
            Swal.fire(
              'Registro completo',
              'Ya estás registrado en nuestro sistema...',
              'success'
            )
          }).catch((error)=>{
            //error promesa cliente
            Swal.fire(
              'Alerta',
              error,
              'error'
            )
          })
      }).catch((error)=>{
        //error promesa persona
        Swal.fire(
          'Alerta',
          error,
          'error'
        )
      })
    }else{
      //error validacion formulario
      Swal.fire(
        'ALERTA',
        'Por favor registre el formulario de manera correcta...',
        'error'
      )
    }
  }
}
