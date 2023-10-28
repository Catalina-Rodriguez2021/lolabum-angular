import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConsesionariosModel } from 'src/app/models/concesionariosModel';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-concesionarios',
  templateUrl: './form-concesionarios.component.html',
  styleUrls: ['./form-concesionarios.component.css']
})
export class FormConcesionariosComponent {
  concecionario: ConsesionariosModel = {
    nombre: null,
    direccion: null,
    telefono: null,
    email: null
  }

  constructor(public api: ServiceService) { }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    nombre: [null, Validators.required],
    direccion: [null, Validators.required],
    telefono: [null, Validators.compose([
      Validators.required, Validators.pattern('^[0-9]+$')
    ])],
    email: [null, Validators.compose([
      Validators.required, Validators.email
    ])]
  });

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.concecionario.nombre = this.addressForm.controls['nombre'].value;
      this.concecionario.direccion = this.addressForm.controls['direccion'].value;
      this.concecionario.telefono = parseInt(this.addressForm.controls['telefono'].value);
      this.concecionario.email = this.addressForm.controls['email'].value;
      console.log(this.concecionario)
      this.api.PostData('Concescionarios', this.concecionario).then((res) => {
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