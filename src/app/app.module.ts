import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { FormularioComponent } from './components/formularios/formulario/formulario.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TreeComponent } from './components/tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';

import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatars';

import { PersonasComponent } from './components/personas/personas.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { ConcesionariosComponent } from './components/concesionarios/concesionarios.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { FormClientesComponent } from './components/formularios/form-clientes/form-clientes.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormVehiculosComponent } from './components/formularios/form-vehiculos/form-vehiculos.component';
import { FormPedidoComponent } from './components/formularios/form-pedido/form-pedido.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ClientesComponent,
    EmpleadosComponent,
    FacturasComponent,
    PedidosComponent,
    FormularioComponent,
    DashboardComponent,
    TablaComponent,
    TreeComponent,
    PersonasComponent,
    VehiculosComponent,
    ConcesionariosComponent,
    CategoriasComponent,
    FormClientesComponent,
    FormVehiculosComponent,
    FormPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    HttpClientModule,
    AvatarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
