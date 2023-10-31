import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { FormClientesComponent } from '../formularios/form-clientes/form-clientes.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent  implements OnInit{
  displayedColumns: string[] = ['idPersona', 'identificacion','nombre1','nombre2','apellido1','apellido2','edad','correo','telefono','opciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource aquí

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public api:ServiceService, public dialog: MatDialog){ }

  
  titulo = 'VISTA PERSONAS';

  ngOnInit(){
    this.api.GetData('personas').then((res)=>{
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
        this.eliminarRelacionesPersona(row.idPersona);
      }
    });
  }

  eliminarRelacionesPersona(idPersona: number) {
    this.api.GetData('Clientes').then((clientes) => {
      const cliente = clientes.find((c) => c.idPersona === idPersona);

      if (cliente) {
        this.api.DeleteData('Clientes', cliente.idCliente).then((res) => {
          console.log('Cliente eliminado', res);
          this.eliminarPersona(idPersona);
        }).catch((err) => {
          console.log('Error al eliminar Cliente', err);
        });
      } else {
        this.api.GetData('Empleadoes').then((empleados) => {
          const empleado = empleados.find((e) => e.idPersona === idPersona);

          if (empleado) {
            this.api.DeleteData('Empleadoes', empleado.idEmpleado).then((res) => {
              console.log('Empleado eliminado', res);
              this.eliminarPersona(idPersona);
            }).catch((err) => {
              console.log('Error al eliminar Empleado', err);
            });
          } else {
            this.eliminarPersona(idPersona);
          }
        });
      }
    });
  }

  eliminarPersona(idPersona: number) {
      this.api.DeleteData('personas', idPersona).then((res) => {
      console.log('Persona eliminada', res);
      this.ngOnInit();
      Swal.fire(
        'Eliminado',
        'El registro ha sido eliminado con éxito.',
        'success'
      );
    }).catch((err) => {
      console.log('Error al eliminar Persona', err);
      Swal.fire(
        'Error',
        'Hubo un error al intentar eliminar el registro.',
        'error'
      );
    });
  }

}