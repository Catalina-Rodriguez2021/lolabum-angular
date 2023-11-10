import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idPedido', 'pedido', 'clienteNombre', 'clienteApellido', 'vehiculoNombre', 'vehiculoPrecio', 'concesionarioNombre'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource aquí

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public api: ServiceService) { }
  titulo = 'VISTA FACTURA';
  loading:boolean = false;
  clientes = []
  facturas = []
  facturasFull = []
  pedidosFull = []
  pedidos = []
  ngOnInit(){
    this.loading = true;
    this.api.GetData('facturas').then((res)=>{
      this.facturasFull = res;
      this.facturas = res;
      console.log(this.dataSource.data)
    })

    this.api.GetData("Clientes").then((res) => {
      this.clientes = res
    })

    this.api.GetData('VistaPedidoConDatosFull').then((res) => {
      this.pedidosFull = res;
      this.dataSource.data = res;
      console.log(this.pedidosFull)
      this.loading = false;
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
    console.log('Editar', row);
  }

  eliminar(row: any) {
    console.log('Eliminar', row);
  }

  filerCliente(id: any) {
    this.facturas = this.facturasFull;
    this.facturas = this.facturas.filter(factura => factura.idCliente === id);
  }

  filterFactura(id:any){
    this.pedidos = this.pedidosFull;
    this.pedidos = this.pedidos.filter(pedido => pedido.idFactura === id);
    this.dataSource.data = this.pedidos;
  }
}

