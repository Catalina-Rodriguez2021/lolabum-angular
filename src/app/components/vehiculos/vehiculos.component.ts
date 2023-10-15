import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { FormVehiculosComponent } from '../formularios/form-vehiculos/form-vehiculos.component';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit{
  displayedColumns: string[] = ['idVehiculos', 'nombre','precio','opciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource aquí

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public api:ServiceService, public dialog: MatDialog){ }
  titulo = 'VISTA VEHICULOS';

  ngOnInit(){
    this.api.GetData('Vehiculoes').then((res)=>{
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

  editar(row: any) {
    console.log('Editar', row);
  }

  eliminar(row: any) {
    console.log('Eliminar', row);
  }

  openDialog(){
    this.dialog.open(FormVehiculosComponent,{

    });
  }
}

