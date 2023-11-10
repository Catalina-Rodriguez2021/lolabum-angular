import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientesModel, ClientesModelUpdate } from 'src/app/models/clientesModel';
import { EmpleadosModelUpdate } from 'src/app/models/empleadosModel';
import { PersonasModel, PersonasModelUpdate } from 'src/app/models/personalsModel';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {
  constructor(public api: ServiceService, public modularService: ModalServiceService, private localStorageService: LocalStorageService) {
    this.habilitado = localStorageService.getItem("isRegistered")
  }
  //variables funcionales

  //titulo
  titulo: String = "Registrar";
  //boton de habilitacion retorno para registro desde menu principal
  habilitado: boolean = true;
  //variable control pantalla de carga
  loading: boolean = false;

  //modelos instanciados funcionales

  //modelo personas para actualizar
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
  //modelo persona para crear
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
  //modelo cliente para actualizar
  clientes: ClientesModelUpdate = {
    idCliente: null,
    idPersona: null,
    usuario: null,
    contrasena: null,
    estado: null
  }
  //modelo cliente para crear
  DataCliente: ClientesModel = {
    idPersona: null,
    usuario: null,
    contrasena: null
  }
  //onInit funcion
  isEdit: boolean = false;
  ngOnInit(): void {
    console.log(this.modularService.accion.value)
    console.log(this.modularService.clientes)
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
        this.modularService.clientes.usuario + ''
      );
      this.addressForm.controls['password'].setValue(
        this.modularService.clientes.contrasena + ''
      );
      this.titulo = this.modularService.titulo;
    }

  }
  //formulario control
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
  //funciones

  private extractPersonaData(op: string): any {
    let opcion = op
    switch (opcion) {
      case "crear":
        return {
          identificacion: this.addressForm.controls['id'].value,
          nombre1: this.addressForm.controls['nombre'].value,
          nombre2: this.addressForm.controls['nombre2'].value,
          apellido1: this.addressForm.controls['apellido'].value,
          apellido2: this.addressForm.controls['apellido2'].value,
          telefono: this.addressForm.controls['telefono'].value,
          edad: this.addressForm.controls['edad'].value,
          correo: this.addressForm.controls['correo'].value
        };
        break;
      default:
        return {
          identificacion: this.addressForm.controls['id'].value,
          nombre1: this.addressForm.controls['nombre'].value,
          nombre2: this.addressForm.controls['nombre2'].value,
          apellido1: this.addressForm.controls['apellido'].value,
          apellido2: this.addressForm.controls['apellido2'].value,
          telefono: this.addressForm.controls['telefono'].value,
          edad: this.addressForm.controls['edad'].value,
          correo: this.addressForm.controls['correo'].value,
          estado: true,
          idPersona: this.modularService.personas.idPersona
        };
        break;
    }

  }
  private extractClienteData(idPersona: number, op: string): any {
    let opcion = op;
    switch (opcion) {
      case "crear":
        return {
          idPersona,
          usuario: this.addressForm.controls['usuario'].value,
          contrasena: this.addressForm.controls['password'].value
        };
        break;
      default:
        return {
          idPersona,
          usuario: this.addressForm.controls['usuario'].value,
          contrasena: this.addressForm.controls['password'].value,
          estado: true,
          idCliente: this.modularService.clientes.idCliente
        };
        break
    }

  }
  async CrearCLiente(): Promise<void> {
    // Lógica común para ambos casos (nuevo registro y edición)
    const personaData = this.extractPersonaData("crear");
    const personaResponse = await this.api.PostData('Personas', personaData);

    const clienteData = this.extractClienteData(personaResponse.idPersona, "crear");
    const clienteResponse = await this.api.PostData('Clientes', clienteData);
  }

  async ActualizarCLiente(): Promise<void> {
    // Lógica común para ambos casos (nuevo registro y edición)
    const personaData = this.extractPersonaData("editar");
    await this.api.updateData('Personas', personaData.idPersona, personaData);

    const clienteData = this.extractClienteData(personaData.idPersona, "editar");
    console.log(clienteData)
    await this.api.updateData('Clientes', clienteData.idCliente, clienteData);

  }
  async onSubmit() {
    try {
      if (this.addressForm.valid) {
        this.loading = true;
        if (!this.isEdit) {
          await this.CrearCLiente();
          //aletar registro exitoso
          Swal.fire(
            'Registro completo',
            'Ya estás registrado en nuestro sistema...',
            'success'
          );
        } else {
          await this.ActualizarCLiente();
          //aletar registro exitoso
          Swal.fire(
            'Registro completo',
            'Ya estás registrado en nuestro sistema...',
            'success'
          );
        }

      }
    } catch (err) {
      Swal.fire(
        'Alerta',
        "Error...",
        'error'
      )
    } finally {
      this.loading = false;
    }

  }

  //regresar menu principal
  realizarAccion() {
    this.localStorageService.setItem('isLoggedIn', false);
    this.localStorageService.setItem('isRegistered', false);
    location.reload();
  }
}