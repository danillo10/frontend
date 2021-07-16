import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import { FakeDbService } from 'app/fake-db/fake-db.service';

import { ApiHttpService } from 'app/shared/services/api-http.service';
import { Constants } from 'app/config/constants';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { LoginModule } from 'app/main/pages/login/login.module';
import { InicioModule } from 'app/main/pages/inicio/inicio.module';
import { CommonModule } from '@angular/common';


const appRoutes: Routes = [
    {
        path        : 'cadastro',
        loadChildren: () => import('./main/pages/cadastro/cadastro.module').then(m => m.CadastroModule)
    },
    {
        path      : '**',
        redirectTo: 'login'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),
        CommonModule,
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        NgxMaskModule.forRoot(),

        // App modules
        LayoutModule,
        LoginModule,
        InicioModule
    ],
    providers   : [
        ApiHttpService,
        Constants
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
