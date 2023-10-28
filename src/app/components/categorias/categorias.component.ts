import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { FormularioComponent } from '../formularios/formulario/formulario.component';
import Swal from 'sweetalert2';

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
  constructor(public api: ServiceService, public dialog: MatDialog) { }
  titulo = 'VISTA CATEGORIA';
  vehiculos = []

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
    // Aquí debes implementar la lógica para editar el elemento
    console.log('Editar', row);
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

        console.log(row.idCategoria)

        this.api.DeleteData("Categoriums", row.idCategoria).then((res) => {
          console.log("AQUI")
          console.log(this.vehiculos)
          this.vehiculos.forEach((element)=>{
            if(element.idCategoria === row.idCategoria){
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

  openDialog(){
    this.dialog.open(FormularioComponent,{
    });
  }
}
