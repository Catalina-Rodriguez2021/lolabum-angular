import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientesModelUpdate } from 'src/app/models/clientesModel';
import { EmpleadosModel, EmpleadosModelUpdate } from 'src/app/models/empleadosModel';
import { PersonasModel, PersonasModelUpdate } from 'src/app/models/personalsModel';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-empleados',
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})
export class FormEmpleadosComponent implements OnInit{
  isEdit: boolean = false;
  titulo:String = "";
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
  DataEmpleado: EmpleadosModel = {
    idPersona: null,
    usuario:null,
    contrasena:null
  }

  empleados: EmpleadosModelUpdate = {
    idEmpleado: null,
    idPersona: null,
    usuario: null,
    contrasena: null,
    estado: null
  }

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

  constructor(public api:ServiceService, public modularService: ModalServiceService){ }
  ngOnInit(): void {
    console.log(this.modularService.accion.value)
    console.log(this.modularService.empleados)
    console.log(this.modularService.personas)
    if (this.modularService.accion.value == "editar") {
      this.isEdit = true;
      console.log(this.modularService.personas)
      this.addressForm.controls['id'].setValue(
        this.modularService.personas.identificacion
      );
      this.addressForm.controls['nombre'].setValue(
        this.modularService.personas.nombre1 + ''
      );
      this.addressForm.controls['nombre2'].setValue(
        this.modularService.personas.nombre2 + ''
      );
      this.addressForm.controls['apellido'].setValue(
        this.modularService.personas.apellido1 + ''
      );
      this.addressForm.controls['apellido2'].setValue(
        this.modularService.personas.apellido2 + ''
      );
      this.addressForm.controls['edad'].setValue(
        this.modularService.personas.edad
      );
      this.addressForm.controls['correo'].setValue(
        this.modularService.personas.correo + ''
      );
      this.addressForm.controls['telefono'].setValue(
        this.modularService.personas.telefono
      );
      this.addressForm.controls['usuario'].setValue(
        this.modularService.empleados.usuario + ''
      );
      this.addressForm.controls['password'].setValue(
        this.modularService.empleados.contrasena + ''
      );
    }
    this.titulo = this.modularService.titulo;
  }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    id: [0, Validators.compose([
      Validators.required, Validators.pattern('^[0-9]+$')
    ])],
    usuario: ['', Validators.compose([
      Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')
    ])],
    nombre: ['', Validators.required],
    nombre2: '',
    apellido: ['', Validators.required],
    apellido2: ['', Validators.required],
    telefono: [0, Validators.compose([
      Validators.required, Validators.pattern('^[0-9]+$')
    ])],
    edad: [0, Validators.compose([
      Validators.required, Validators.pattern('^[0-9]+$')
    ])],
    correo: ['', Validators.compose([
      Validators.required, Validators.email
    ])],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (!this.isEdit) {
      //validacion del fomrulario
      if (this.addressForm.valid) {
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
            //cuando se complete la promesa correctamente ahora se debe agregar un Empleado a esa persona
            //se instancia los datos del Empleado con los datos del formulario
            this.DataEmpleado.idPersona = res.idPersona,
            this.DataEmpleado.usuario = this.addressForm.controls['usuario'].value,
            this.DataEmpleado.contrasena = this.addressForm.controls['password'].value
            console.log(this.DataEmpleado);
            //enviar datos a post de Empleados
            this.api.PostData('Empleadoes',this.DataEmpleado).then((res)=>{
              console.log(res)
              //aletar registro exitoso
              Swal.fire(
                'Registro completo',
                'Ya estás registrado en nuestro sistema...',
                'success'
              )
            }).catch((error)=>{
              //error promesa Empleado
              Swal.fire(
                'Alerta',
                error,
                'error'
              )
            })
        }).catch((error) => {
          //error promesa persona
          Swal.fire(
            'Alerta',
            error,
            'error'
          )
        })
      } else {
        //error validacion formulario
        Swal.fire(
          'ALERTA',
          'Por favor registre el formulario de manera correcta...',
          'error'
        )
      }
    } else {
      //validacion del fomrulario
      if (this.addressForm.valid) {
        //instanciar objeto personsa con los datos del formulario
        this.personas.identificacion = this.addressForm.controls['id'].value;
        this.personas.nombre1 = this.addressForm.controls['nombre'].value;
        this.personas.nombre2 = this.addressForm.controls['nombre2'].value;
        this.personas.apellido1 = this.addressForm.controls['apellido'].value;
        this.personas.apellido2 = this.addressForm.controls['apellido2'].value;
        this.personas.telefono = this.addressForm.controls['telefono'].value;
        this.personas.edad = this.addressForm.controls['edad'].value;
        this.personas.correo = this.addressForm.controls['correo'].value;
        this.personas.estado = true;
        this.personas.idPersona = this.modularService.personas.idPersona
        console.log(this.personas)
        //cuando se instancia, enviar personal al metodo post de personas
        this.api.updateData('Personas', this.personas.idPersona, this.personas).then((res) => {
          console.log(res);
          //cuando se complete la promesa correctamente ahora se debe agregar un cliente a esa persona
          //se instancia los datos del cliente con los datos del formulario
          this.empleados.idPersona = this.modularService.personas.idPersona;
          this.empleados.usuario = this.addressForm.controls['usuario'].value;
          this.empleados.contrasena = this.addressForm.controls['password'].value;
          this.empleados.estado = true;
          this.empleados.idEmpleado = this.modularService.empleados.idEmpleado;
          console.log(this.empleados);
          //enviar datos a post de empleados
          this.api.updateData('Empleadoes', this.empleados.idEmpleado,this.empleados).then((res) => {
            console.log(res)
            //aletar registro exitoso
            Swal.fire(
              'Registro completo',
              'Ya estás registrado en nuestro sistema...',
              'success'
            )
          }).catch((error) => {
            //error promesa cliente
            console.log(error)
            Swal.fire(
              'Alerta',
              error,
              'error'
            )
          })
        }).catch((error) => {
          //error promesa persona
          console.log(error)
          Swal.fire(
            'Alerta',
            error,
            'error'
          )
        })
      } else {
        //error validacion formulario
        Swal.fire(
          'ALERTA',
          'Por favor registre el formulario de manera correcta...',
          'error'
        )
      }
    }

  }
}
