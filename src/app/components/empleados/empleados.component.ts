import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { FormEmpleadosComponent } from '../formularios/form-empleados/form-empleados.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  displayedColumns: string[] = ['idEmpleado','usuario','identificacion','nombre1','nombre2','apellido1','apellido2','edad','correo','telefono','opciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar dataSource aquí

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public api:ServiceService, public dialog: MatDialog, public modularService: ModalServiceService){ }
  titulo = 'VISTA EMPLEADOS';
  loading:boolean = false;

  ngOnInit() {
    this.loading = true;
    this.api.GetData('Empleadoes').then((res)=>{
      this.dataSource.data = res
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
  
  async editar(row: any) {
    this.modularService.accion.next("editar");
    this.modularService.titulo = "Editar";
  
    try {
      const empleadoData = await this.api.GetData('Empleadoes/' + row.idEmpleado);
      this.modularService.empleados = empleadoData;
  
      const personaData = await this.api.GetData('Personas/' + empleadoData.idPersona);
      this.modularService.personas = personaData;
      const dialogRef = this.dialog.open(FormEmpleadosComponent, {
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed'+result);
        this.ngOnInit();
      });
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
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

        console.log(row.idEmpleado);

        this.api.DeleteData("Empleadoes", row.idEmpleado).then((res) => {
          console.log(res);
          this.ngOnInit();
          this.api.DeleteData("Personas",row.idPersona).then(res=>{
            console.log(res);
            Swal.fire(
              'Eliminado',
              'El registro ha sido eliminado con éxito.',
              'success'
            );
          })
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
    const dialogRef = this.dialog.open(FormEmpleadosComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      this.ngOnInit();
    });
  }

}