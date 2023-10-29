import { Injectable } from '@angular/core';
import { CategoriaModel, CategoriaModelUpdate } from '../models/categoriaModel';
import { ClientesModel } from '../models/clientesModel';
import { ConsesionariosModel, ConsesionariosModelUpdate } from '../models/concesionariosModel';
import { EmpleadosModel } from '../models/empleadosModel';
import { FacturaModel } from '../models/facturaModel';
import { PedidosModel } from '../models/pedidosModel';
import { PersonasModel } from '../models/personalsModel';
import { VehiculosModel, VehiculosModelUpdate } from '../models/vehiculosModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  categorias:CategoriaModelUpdate;
  clientes:ClientesModel;
  concesionario:ConsesionariosModelUpdate;
  empleados:EmpleadosModel;
  facturas:FacturaModel;
  pedidos:PedidosModel;
  personas:PersonasModel;
  vehiculos:VehiculosModelUpdate;

  id:number;
  titulo:String;
  accion = new BehaviorSubject("");
  constructor() { }
}
