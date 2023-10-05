import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


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


  onSubmit(): void {
    alert('Thanks!');
  }
}
