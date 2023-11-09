import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { ConsesionariosModel, ConsesionariosModelUpdate } from 'src/app/models/concesionariosModel';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  titulo:String = "Inicio de sesión";


  isEdit:boolean = false;
  constructor(public api: ServiceService, public modularService:ModalServiceService, public login:AuthServiceService) { }
  ngOnInit(): void {

  }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required],
  });

  onSubmit(): void {
    if(this.addressForm.valid){
      this.api.login(this.addressForm.controls['usuario'].value,this.addressForm.controls['contrasena'].value).then(res =>{
        console.log("inicio de sesión");
        this.login.toggleMenu();
      }).catch(err =>{
        Swal.fire(
          'Alerta',
          "error al iniciar sesión",
          'error'
        )
        console.log("error inicio de sesion")
      })
    }
  }
}
