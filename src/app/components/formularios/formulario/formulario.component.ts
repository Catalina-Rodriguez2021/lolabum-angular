import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaModel } from 'src/app/models/categoriaModel';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    categoria : [null,Validators.required]
  });

  categoria: CategoriaModel ={
    nombre: null
  }

  constructor(public api:ServiceService){}

  onSubmit(): void {
    if(this.addressForm.valid){
      this.categoria.nombre = this.addressForm.controls['categoria'].value,
      this.api.PostData("Categoriums",this.categoria).then((res)=>{
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


