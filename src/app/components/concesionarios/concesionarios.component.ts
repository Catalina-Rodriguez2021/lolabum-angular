import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { FormConcesionariosComponent } from '../formularios/form-concesionarios/form-concesionarios.component';
import { MatDialog } from '@angular/material/dialog';
import { ConsesionariosModelUpdate } from 'src/app/models/concesionariosModel';
import Swal from 'sweetalert2';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { FormClientesComponent } from '../formularios/form-clientes/form-clientes.component';

@Component({
  selector: 'app-concesionarios',
  templateUrl: './concesionarios.component.html',
  styleUrls: ['./concesionarios.component.css']
})
export class ConcesionariosComponent implements OnInit {
  displayedColumns: string[] = ['idConcesionario', 'direccion', 'email', 'nombre', 'telefono', 'opciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource aquí

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public api: ServiceService, public dialog: MatDialog, public modularService: ModalServiceService) { }
  titulo = 'VISTA CONCESIONARIOS';
  vehiculos = []


  ngOnInit() {
    this.api.GetData('Concescionarios').then((res) => {
      this.dataSource.data = res;
      console.log(this.dataSource.data)
    });

    this.api.GetData('Vehiculoes').then((res) => {
      this.vehiculos = res;
      console.log(this.vehiculos)
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
    this.modularService.concesionario = row;
    this.dialog.open(FormConcesionariosComponent, {
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
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Si, elimínalo!'
    }).then((result) => {
      if (result.isConfirmed) {

        console.log(row.idConcesionario)

        this.api.DeleteData("Concescionarios/delete", row.idConcesionario).then((res) => {
          console.log("AQUI")
          console.log(this.vehiculos)
          this.vehiculos.forEach((element) => {
            if (element.idConcesionario === row.idConcesionario) {
              console.log(element)
              console.log("entra ciclo")
              this.api.DeleteData("Vehiculoes", element.idVehiculos).then((res) => {
                console.log(res);
                console.log('eliminado');
                console.log(element)
              }).catch((err) => {
                console.log(err)
              })
            }
          })
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
    this.modularService.accion.next("crear");
    this.modularService.titulo = "Crear"
    const dialogRef = this.dialog.open(FormConcesionariosComponent)

    dialogRef.afterClosed().subscribe(res =>{
      this.ngOnInit()
    })
  }

}

