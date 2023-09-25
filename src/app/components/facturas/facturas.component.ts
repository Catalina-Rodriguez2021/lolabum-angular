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
  displayedColumns: string[] = ['idFactura', 'fechaFactura','state'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource aquí

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public api: ServiceService) { }
  titulo = 'VISTA FACTURA';


  ngOnInit(){
    this.api.GetData('facturas').then((res)=>{
      this.dataSource.data = res;
      console.log(this.dataSource.data)
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
}
