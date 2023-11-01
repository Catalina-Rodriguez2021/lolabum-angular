import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaModel, CategoriaModelUpdate } from 'src/app/models/categoriaModel';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  constructor(public api:ServiceService, public modularService:ModalServiceService){}
  titulo:String = ""
  isEdit:boolean = false;
  id:number;
  ngOnInit(): void {
    if(this.modularService.accion.value == "editar"){
      this.isEdit = true;
      console.log(this.modularService.titulo)
      console.log(this.modularService.categorias)
      this.addressForm.controls['categoria'].setValue(
        this.modularService.categorias.nombre + ''
      );
    }
    this.titulo = this.modularService.titulo;
  }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    categoria : ['',Validators.required]
  });

  categoria: CategoriaModel ={
    nombre: null
  }

  categoriaUpdate: CategoriaModelUpdate = {
    estado:null,
    idCategoria:null,
    nombre:null
  }


  onSubmit(): void {
      if (!this.isEdit) {
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
      }else{
        if(this.addressForm.valid){
          console.log("editar")
          this.id = this.modularService.categorias.idCategoria;
          this.categoriaUpdate = this.modularService.categorias;
          this.categoriaUpdate.nombre = this.addressForm.controls['categoria'].value,
          console.log(this.categoriaUpdate)
          console.log(this.id)
          this.api.updateData("Categoriums",this.id,this.categoriaUpdate).then((res)=>{
            console.log(res);
            Swal.fire(
              'Registro actualizado',
              'Ya estás actualozado en nuestro sistema...',
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
}


