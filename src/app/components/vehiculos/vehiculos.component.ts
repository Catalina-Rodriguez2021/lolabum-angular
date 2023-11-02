import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { FormVehiculosComponent } from '../formularios/form-vehiculos/form-vehiculos.component';
import Swal from 'sweetalert2';
import { ModalServiceService } from 'src/app/services/modal-service.service';

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

  constructor(public api:ServiceService, public dialog: MatDialog, public modularService:ModalServiceService){ }
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
    this.modularService.accion.next("editar");
    this.modularService.titulo = "Editar";
    this.modularService.vehiculos = row;
    const dialogRef = this.dialog.open(FormVehiculosComponent, {
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


        console.log(row.idVehiculos)

        this.api.DeleteData("Vehiculoes", row.idVehiculos).then((res) => {
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

  openDialog(){
    this.modularService.accion.next("crear");
    this.modularService.titulo = "Crear"
    const dialogRef = this.dialog.open(FormVehiculosComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      this.ngOnInit();
    });
  }
}

