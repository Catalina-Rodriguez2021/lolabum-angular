import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { FormularioComponent } from '../formularios/formulario/formulario.component';
import Swal from 'sweetalert2';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idCategoria', 'nombre','opciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public api: ServiceService, public dialog: MatDialog, public modalService:ModalServiceService) { }
  titulo = 'VISTA CATEGORIA';
  vehiculos = []
  loading:boolean = false;

  ngOnInit() {
    this.api.GetData('Categoriums').then((res) => {
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
    this.modalService.accion.next("editar");
    this.modalService.titulo = "Editar"
    this.modalService.categorias = row;

    const dialogRef = this.dialog.open(FormularioComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      this.ngOnInit();
    });

  }
  
  eliminar(row: any) {
    //boton confirmacion eliminar
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
        console.log(row.idCategoria)
        this.api.DeleteData("Categoriums", row.idCategoria).then((res) => {
          this.vehiculos.forEach((element)=>{
            if(element.idCategoria === row.idCategoria){
              this.api.DeleteData("Vehiculoes", element.idVehiculos).then((res) => {
              })
            }
          })
          this.ngOnInit();
          Swal.fire(
            'Eliminado!',
            'El resgitro ha sido eliminado con exito.',
            'success'
          )
        })
      }
    })
  }

  onSubmit(){
    this.modalService.accion.next("crear");
    this.modalService.titulo = "Crear"
    const dialogRef = this.dialog.open(FormularioComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
