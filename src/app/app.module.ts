import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';  

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';
import { AppState } from './state/app.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';


import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AlertmodModule } from './accommonmod/alertmod/alertmod.module';
import { AccoreModule } from './accore/accore.module';
import { DialogsModule } from './accommonmod/dialogmod/dialogs.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AlertmodModule,
    DialogsModule,
    AccoreModule,
    //NGXS related imports START
    NgxsModule.forRoot([
      AppState,
    ], { developmentMode: !environment.production }),
    
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    NgxsRouterPluginModule.forRoot()
    //NGXS related imports END
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
