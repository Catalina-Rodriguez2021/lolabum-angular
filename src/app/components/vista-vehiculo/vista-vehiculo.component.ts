import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  vehiculoInfo: any;
}

@Component({
  selector: 'app-vista-vehiculo',
  templateUrl: './vista-vehiculo.component.html',
  styleUrls: ['./vista-vehiculo.component.css'],
})
export class VistaVehiculoComponent implements OnInit {
  titulo: String = '';
  precio:String = '';
  constructor(public dialogRef: MatDialogRef<VistaVehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.titulo = this.data.vehiculoInfo.nombre;
    this.precio = this.data.vehiculoInfo.precio;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
