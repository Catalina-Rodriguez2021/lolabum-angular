import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServiceService } from 'src/app/services/service.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {
  titulo: String = "Inicio de sesión";
  loading: Boolean = false;

  isEdit: boolean = false;
  constructor(public api: ServiceService, public modularService: ModalServiceService, private localStorageService: LocalStorageService) { }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.addressForm.valid) {
      //loader
      this.loading = true;
      this.api.login(this.addressForm.controls['usuario'].value, this.addressForm.controls['contrasena'].value).then(res => {
        console.log("inicio de sesión");
        this.localStorageService.setItem('nombre', res.usuario);
        this.localStorageService.setItem('isLoggedIn', true);
        location.reload();
        //loader
        this.loading = false
      }).catch(err => {
        Swal.fire(
          'Alerta',
          "error al iniciar sesión",
          'error'
        )
        console.log("error inicio de sesion");
        //loader
        this.loading = false;
      })
    }
  }

  crearCuenta() {
    this.localStorageService.setItem('isLoggedIn', false);
    this.localStorageService.setItem('isRegistered', true);
    location.reload();
  }
}
