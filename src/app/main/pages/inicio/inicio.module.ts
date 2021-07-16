import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { InicioComponent } from './inicio.component';

const routes = [
  {
      path     : 'inicio',
      component: InicioComponent
  }
];

@NgModule({
  declarations: [
      InicioComponent
  ],
  imports     : [
      RouterModule.forChild(routes),

      FuseSharedModule
  ],
  exports     : [
      InicioComponent
  ]
})

export class InicioModule
{
}
