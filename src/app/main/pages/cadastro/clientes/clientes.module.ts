import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';


import { NgxMaskModule, IConfig } from 'ngx-mask'

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { ClientesComponent } from './clientes.component';
import { ClientesService } from 'app/shared/services/clientes.service';

import { UtilsService } from 'app/shared/services/utils.service';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = [
  {
      path     : '',
      component: ClientesComponent,
      resolve  : {
          data: ClientesService
      }
  },
  {
    path     : ':id',
    component: ClienteComponent,
    resolve  : {
        data: ClientesService
    }
  },
  {
    path     : ':id/:handle',
    component: ClienteComponent,
    resolve  : {
        data: ClientesService
    }
  }
]

@NgModule({
  declarations: [
    ClientesComponent,
    ClienteComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCardModule,
    MatTooltipModule,

    NgxChartsModule,

    NgxMaskModule.forRoot(),

    FuseSharedModule,
    FuseWidgetModule
  ],
  providers   : [
    ClientesService,
    UtilsService
  ]
})
export class ClientesModule { }