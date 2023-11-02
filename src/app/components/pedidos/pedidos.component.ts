import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { MatDialog } from '@angular/material/dialog';
import { FormPedidoComponent } from '../formularios/form-pedido/form-pedido.component';
import { FacturaModel } from 'src/app/models/facturaModel';
import Swal from 'sweetalert2';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { FormularioComponent } from '../formularios/formulario/formulario.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  displayedColumns: string[] = ['idPedido', 'pedido', 'clienteNombre', 'clienteApellido', 'vehiculoNombre', 'vehiculoPrecio', 'concesionarioNombre', 'opciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource aquí

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public api: ServiceService, public dialog: MatDialog, public modalService:ModalServiceService) { }
  titulo = 'CARRITO DE COMPRAR';
  //Para actuvar el boton comprar cuando el diferente de null 
  //que significa que se tiene seleccionado un cliente
  id = null;
  //lista de clientes
  clientes = [];
  //lista pedios mapeo para editar
  pedidos = [];
  //pedido completo para filstrar 
  //ESTE ES LOS PEDIDOS DE LA VISTA
  pedidoCompleto;
  //ESTE ES LOS PEDIDOS DE LA TABLA PEDIDOS PARA ACTUALIZARLOS E INGRESARLOS A LA FACTURA
  pedidosCompleto = [];
  //data para construir formnato fecha
  date: Date;
  day: number
  month: number
  year: number
  fechaFormateada: string

  //modelo de factura para crear la compra
  facturaModel: FacturaModel = {
    fechaFactura: null,
    idCliente:null
  }

  idCliente:number;

  ngOnInit() {
    this.api.GetData('VistaPedidoConDato').then((res) => {
      this.pedidoCompleto = res;
      this.dataSource.data = res;
    })

    this.api.GetData("Clientes").then((res) => {
      this.clientes = res
      console.log(this.clientes)
    })

    this.api.GetData("Pedidoes").then((res) => {
      this.pedidosCompleto = res;
      console.log(this.pedidosCompleto);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(row: any) {
    this.modalService.accion.next("editar");
    this.modalService.titulo = "Editar"
    this.modalService.pedidos = row;
    const dialogRef = this.dialog.open(FormPedidoComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      this.ngOnInit();
    });
  }

  eliminar(row: any) {
    Swal.fire({
      title: 'Está seguro?',
      text: "No será capáz de revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínalo!'
    }).then((result) => {
      if (result.isConfirmed) {

        console.log(row.idPedido)

        this.api.DeleteData("Pedidoes", row.idPedido).then((res) => {
          console.log(res);
          this.ngOnInit();
          Swal.fire(
            'Eliminado!',
            'El resgitro ha sido eliminado con exito.',
            'success'
          )
        }).catch((err) => {
          console.log(err)
        })

      }
    })
  }

  openDialog() {
    this.modalService.accion.next("crear");
    this.modalService.titulo = "Crear"
    const dialogRef = this.dialog.open(FormPedidoComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      this.ngOnInit();
    });
  }

  filerCliente(id: any) {

    this.id = id;
    this.dataSource.data = this.pedidoCompleto;
    this.dataSource.data = this.pedidoCompleto.filter(pedido => pedido.idCliente === id);

    this.pedidos = this.pedidosCompleto;
    this.pedidos = this.pedidosCompleto.filter(pedido => pedido.idCliente === id);
    //mapeo desestructurando pedidos para poder encajar con modelo de update
    this.pedidos = this.pedidos.map(({ idFacturaNavigation, idVehiculosNavigation, ...objetoMaped }) => objetoMaped)
    console.log(this.pedidos)

    this.idCliente = id;
  }

  comprar() {

    Swal.fire({
      title: 'Está seguro?',
      text: "No será capáz de revertir la compra!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Si, comprar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();

        this.fechaFormateada = `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
        console.log(this.fechaFormateada)
        console.log(this.dataSource.data)
        this.facturaModel.fechaFactura = this.fechaFormateada;
        this.facturaModel.idCliente = this.idCliente;

        this.api.PostData("Facturas", this.facturaModel).then((res) => {
          console.log(res)
          this.pedidos.forEach((element) => {
            element.idFactura = res.idFactura;
            element.estado = false;
          })
          this.pedidos.forEach((element) => {
            this.api.updateData("Pedidoes", element.idPedido, element).then((res) => {
            })
          })
          Swal.fire(
            'Registro completo',
            'Ya estás registrado en nuestro sistema...',
            'success'
          )
          this.ngOnInit();
        })
      }
    })


  }

}
