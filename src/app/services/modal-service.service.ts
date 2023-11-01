import { Injectable } from '@angular/core';
import { CategoriaModel, CategoriaModelUpdate } from '../models/categoriaModel';
import { ClientesModel, ClientesModelUpdate } from '../models/clientesModel';
import { ConsesionariosModel, ConsesionariosModelUpdate } from '../models/concesionariosModel';
import { EmpleadosModel, EmpleadosModelUpdate } from '../models/empleadosModel';
import { FacturaModel } from '../models/facturaModel';
import { PedidoUpdateModel, PedidosModel } from '../models/pedidosModel';
import { PersonasModel, PersonasModelUpdate } from '../models/personalsModel';
import { VehiculosModel, VehiculosModelUpdate } from '../models/vehiculosModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  categorias:CategoriaModelUpdate;
  clientes:ClientesModelUpdate;
  concesionario:ConsesionariosModelUpdate;
  empleados:EmpleadosModelUpdate;
  facturas:FacturaModel;
  pedidos:PedidoUpdateModel;
  personas:PersonasModelUpdate;
  vehiculos:VehiculosModelUpdate;

  id:number;
  titulo:String;
  accion = new BehaviorSubject("");
  constructor() { }
}
