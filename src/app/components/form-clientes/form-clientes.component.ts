import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent {
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
  });

  onSubmit(): void {
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
  }
}
