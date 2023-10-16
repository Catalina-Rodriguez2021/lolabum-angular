import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { FormConcesionariosComponent } from '../formularios/form-concesionarios/form-concesionarios.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-concesionarios',
  templateUrl: './concesionarios.component.html',
  styleUrls: ['./concesionarios.component.css']
})
export class ConcesionariosComponent implements OnInit {
  displayedColumns: string[] = ['idConcesionario', 'direccion', 'email', 'nombre','telefono','opciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource aquí

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public api: ServiceService, public dialog: MatDialog) { }
  titulo = 'VISTA CONCESIONARIOS';

  ngOnInit() {
    this.api.GetData('Concescionarios').then((res) => {
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
    // Aquí debes implementar la lógica para editar el elemento
    console.log('Editar', row);
  }
  
  eliminar(row: any) {
    // Aquí debes implementar la lógica para eliminar el elemento
    console.log('Eliminar', row);
  }
  openDialog(){
    this.dialog.open(FormConcesionariosComponent,{

    });
  }
}

