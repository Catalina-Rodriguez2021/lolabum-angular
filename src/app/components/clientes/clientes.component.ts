import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import {MatDialog} from '@angular/material/dialog';
import { FormClientesComponent } from '../formularios/form-clientes/form-clientes.component';
import Swal from 'sweetalert2';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  displayedColumns: string[] = ['idCliente','usuario','identificacion','nombre1','nombre2','apellido1','apellido2','correo','telefono','edad','opciones'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource aquí

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public api:ServiceService, public dialog: MatDialog, public modularService: ModalServiceService){ }
  titulo = 'VISTA CLIENTES';


  ngOnInit(){
    this.api.GetData('Clientes').then((res)=>{
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
    this.modularService.accion.next("editar")
    this.modularService.titulo = "Editar"
    this.modularService.clientes = row;
    this.dialog.open(FormClientesComponent, {
    });
  }

  eliminar(row: any) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrá revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínelo'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(row.idCliente);
  
        this.api.DeleteData("Clientes", row.idCliente).then((res) => {
          console.log(res);
          this.ngOnInit();
          Swal.fire(
            'Eliminado',
            'El registro ha sido eliminado con éxito.',
            'success'
          );
        }).catch((err) => {
          console.log(err);
          Swal.fire(
            'Error',
            'Hubo un error al intentar eliminar el registro.',
            'error'
          );
        });
      }
    });
  }
  
  openDialog() {
    this.modularService.accion.next("crear");
    this.modularService.titulo = "Crear"
    const dialogRef = this.dialog.open(FormClientesComponent)

    dialogRef.afterClosed().subscribe(res =>{
      this.ngOnInit()
    })
  }

}


