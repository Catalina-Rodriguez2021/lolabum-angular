import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { PedidoUpdateModel, PedidosModel } from 'src/app/models/pedidosModel';
import { VehiculosModel } from 'src/app/models/vehiculosModel';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html',
  styleUrls: ['./form-pedido.component.css']
})
export class FormPedidoComponent {
  constructor(public api: ServiceService, public modularService: ModalServiceService) { }
  clientes = [];
  facturas = [];
  vehiculos = [];
  vehiculosComplete = []
  categorias = [];
  categoria: any = null;
  titulo: String = '';

  isEdit = false;

  pedido: PedidosModel = {
    pedido: null,
    idCliente: null,
    idVehiculos: null
  }

  pedidoUpdate: PedidoUpdateModel = {
    estado: null,
    idCliente: null,
    idFactura: null,
    idPedido: null,
    idVehiculos: null,
    pedido: null
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

    if (this.modularService.accion.value == "editar") {
      this.isEdit = true;
      console.log(this.modularService.titulo)
      console.log(this.modularService.pedidos)
      this.addressForm.controls['description'].setValue(
        this.modularService.pedidos.pedido + ''
      );
      this.addressForm.controls['usuario'].setValue(
        this.modularService.pedidos.idCliente
      );
      this.addressForm.controls['vehiculo'].setValue(
        this.modularService.pedidos.idVehiculos
      );
    }
    this.titulo = this.modularService.titulo;
  }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    description: ['', Validators.required],
    usuario: [0, Validators.required],
    vehiculo: [0, Validators.required],
    categoria: [],
  });

  onSubmit(): void {
    if (!this.isEdit) {
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
    } else {
      if (this.addressForm.valid) {
        this.pedidoUpdate.idCliente = this.addressForm.controls['usuario'].value;
        this.pedidoUpdate.pedido = this.addressForm.controls['description'].value;
        this.pedidoUpdate.idVehiculos = this.addressForm.controls['vehiculo'].value;
        this.pedidoUpdate.estado = true;
        this.pedidoUpdate.idFactura = null;
        this.pedidoUpdate.idPedido = this.modularService.pedidos.idPedido;
        console.log(this.pedidoUpdate)
        console.log(this.modularService.pedidos)
        this.api.updateData("Pedidoes", this.modularService.pedidos.idPedido, this.pedidoUpdate).then((res) => {
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


  }

  filerCategoria(id: any) {
    console.log(id)
    this.vehiculos = this.vehiculosComplete;
    this.vehiculos = this.vehiculos.filter(vehiculo => vehiculo.idCategoria === id);
  }
}
