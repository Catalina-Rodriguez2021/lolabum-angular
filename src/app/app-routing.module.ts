import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConcesionariosComponent } from './components/concesionarios/concesionarios.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PersonasComponent } from './components/personas/personas.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { FormularioComponent } from './components/formularios/formulario/formulario.component';
import { FormClientesComponent } from './components/formularios/form-clientes/form-clientes.component';
import { FormEmpleadosComponent } from './components/formularios/form-empleados/form-empleados.component';
import { FormConcesionariosComponent } from './components/formularios/form-concesionarios/form-concesionarios.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    'path' : 'categoria',
    'component' : CategoriasComponent
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
  {
    'path': 'form',
    'component' : FormularioComponent
  },
  {
    'path': 'formClientes',
    'component': FormClientesComponent
  },
  {
    'path': 'formEmpleados',
    'component': FormEmpleadosComponent
  },
  {
    'path': 'formConcesionarios',
    'component': FormConcesionariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
