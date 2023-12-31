import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { FormClientesComponent } from '../formularios/form-clientes/form-clientes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent  implements OnInit{
  displayedColumns: string[] = ['idPersona', 'identificacion','nombre1','nombre2','apellido1','apellido2','edad','correo','telefono'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource aquí

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public api:ServiceService, public dialog: MatDialog){ }

  
  titulo = 'VISTA PERSONAS';
  loading:boolean = false;
  ngOnInit(){
    this.loading = true;
    this.api.GetData('personas').then((res)=>{
      this.dataSource.data = res;
      console.log(this.dataSource.data)
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

}