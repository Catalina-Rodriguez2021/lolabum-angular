import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonasModel, PersonasModelUpdate } from 'src/app/models/personalsModel';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-personas',
  templateUrl: './form-personas.component.html',
  styleUrls: ['./form-personas.component.css']
})
export class FormPersonasComponent {
  constructor(public api: ServiceService, public modularService: ModalServiceService) { }
  titulo: String = ""

  personas: PersonasModelUpdate = {
    idPersona: null,
    identificacion: null,
    nombre1: null,
    nombre2: null,
    apellido1: null,
    apellido2: null,
    edad: null,
    correo: null,
    telefono: null,
    estado: null

  }

  DataPersonas: PersonasModel = {
    identificacion: null,
    nombre1: null,
    nombre2: null,
    apellido1: null,
    apellido2: null,
    edad: null,
    correo: null,
    telefono: null
  }

  isEdit: boolean = false;
  id: number;
  ngOnInit(): void {
    if (this.modularService.accion.value == "editar") {
      this.isEdit = true;
      console.log(this.modularService.personas)
      this.addressForm.controls['identificacion'].setValue(
        this.modularService.personas.identificacion + ''
      );
      this.addressForm.controls['nombre1'].setValue(
        this.modularService.personas.nombre1 + ''
      );
      this.addressForm.controls['nombre2'].setValue(
        this.modularService.personas.nombre2 + ''
      );
      this.addressForm.controls['apellido1'].setValue(
        this.modularService.personas.apellido1 + ''
      );
      this.addressForm.controls['apellido2'].setValue(
        this.modularService.personas.apellido2 + ''
      );
      this.addressForm.controls['edad'].setValue(
        this.modularService.personas.edad + ''
      );
      this.addressForm.controls['correo'].setValue(
        this.modularService.personas.correo + ''
      );
      this.addressForm.controls['telefono'].setValue(
        this.modularService.personas.telefono + ''
      );
      this.addressForm.controls['telefono'].setValue(
        this.modularService.personas.telefono + ''
      );           
    }
    this.titulo = this.modularService.titulo;
  }
    private fb = inject(FormBuilder);
    addressForm = this.fb.group({
    personas: this.fb.group({
      id: [null, Validators.compose([
        Validators.required, Validators.pattern('^[0-9]+$')
      ])],
      usuario: [null, Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')
      ])],
      nombre: [null, Validators.required],
      nombre2: null,
      apellido: [null, Validators.required],
      apellido2: [null, Validators.required],
      telefono: [null, Validators.compose([
        Validators.required, Validators.pattern('^[0-9]+$')
      ])],
      edad: [null, Validators.compose([
        Validators.required, Validators.pattern('^[0-9]+$')
      ])],
      correo: [null, Validators.compose([
        Validators.required, Validators.email
      ])]
    })
  });

  onSubmit(): void {
    //validacion del fomrulario
    if (this.addressForm.valid) {
      //instanciar objeto personsa con los datos del formulario
      this.DataPersonas.identificacion = this.addressForm.controls['id'].value,
      this.DataPersonas.nombre1 = this.addressForm.controls['nombre'].value,
      this.DataPersonas.nombre2 = this.addressForm.controls['nombre2'].value,
      this.DataPersonas.apellido1 = this.addressForm.controls['apellido'].value,
      this.DataPersonas.apellido2 = this.addressForm.controls['apellido2'].value,
      this.DataPersonas.telefono = this.addressForm.controls['telefono'].value,
      this.DataPersonas.edad = this.addressForm.controls['edad'].value,
      this.DataPersonas.correo = this.addressForm.controls['correo'].value,
      console.log(this.DataPersonas)
      //cuando se instancia, enviar personal al metodo post de personas
      this.api.PostData('Personas',this.DataPersonas).then((res)=>{
          console.log(res);
        
            Swal.fire(
              'Registro completo',
              'Ya estás registrado en nuestro sistema...',
              'success'
            )
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
