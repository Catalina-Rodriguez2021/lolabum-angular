import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { PedidosModel } from 'src/app/models/pedidosModel';
import { VehiculosModel } from 'src/app/models/vehiculosModel';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html',
  styleUrls: ['./form-pedido.component.css']
})
export class FormPedidoComponent {
  constructor(public api: ServiceService) { }
  clientes = [];
  facturas = [];
  vehiculos = [];
  vehiculosComplete = []
  categorias = [];
  categoria: any = null;

  pedido: PedidosModel = {
    pedido: null,
    idCliente: null,
    idVehiculos: null
  }

  ngOnInit(): void {
    this.api.GetData("Clientes").then((res) => {
      this.clientes = res
      console.log(this.clientes)
    })

    this.api.GetData("Vehiculoes").then((res) => {
      this.vehiculos = res
      this.vehiculosComplete = res
      console.log(this.vehiculos)
    })

    this.api.GetData("Categoriums").then((res) => {
      this.categorias = res
      console.log(this.categorias)
    })

    this.api.GetData('facturas').then((res) => {
      this.facturas = res.filter(factura => factura.state === true);
      console.log(this.facturas)
    })
  }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    description: [null, Validators.required],
    usuario: [null, Validators.required],
    vehiculo: [null, Validators.required],
    categoria: [null, Validators.required],
  });

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.pedido.idCliente = this.addressForm.controls['usuario'].value,
        this.pedido.pedido = this.addressForm.controls['description'].value,
        this.pedido.idVehiculos = this.addressForm.controls['vehiculo'].value
        console.log(this.pedido)
      this.api.PostData("Pedidoes", this.pedido).then((res) => {
        console.log(res)
        //aletar registro exitoso
        Swal.fire(
          'Registro completo',
          'Ya estás registrado en nuestro sistema...',
          'success'
        )
      }).catch((err) => {
        console.log(err)
      })
    } else {
      Swal.fire(
        'ALERTA',
        'Por favor registre el formulario de manera correcta...',
        'error'
      )
    }

  }

  filerCategoria(id: any) {
    console.log(id)
    this.vehiculos = this.vehiculosComplete;
    this.vehiculos = this.vehiculos.filter(vehiculo => vehiculo.idCategoria === id);
  }
}
