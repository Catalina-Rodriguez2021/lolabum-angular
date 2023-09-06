import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConcesionariosComponent } from './components/concesionarios/concesionarios.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PersonasComponent } from './components/personas/personas.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';

const routes: Routes = [
  {
    'path' : 'categoria',
    'component' : CategoriaComponent
  },
  {
    'path' : 'clientes',
    'component' : ClientesComponent
  },
  {
    'path' : 'concesionarios',
    'component' : ConcesionariosComponent
  },
  {
    'path' : 'empleados',
    'component' : EmpleadosComponent
  },
  {
    'path' : 'facturas',
    'component' : FacturasComponent
  },
  {
    'path' : 'pedidos',
    'component' : PedidosComponent
  },
  {
    'path' : 'personas',
    'component' : PersonasComponent
  },
  {
    'path' : 'vehiculos',
    'component' : VehiculosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
