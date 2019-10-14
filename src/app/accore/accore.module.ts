import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';

import {ApiService} from './apiservice/api.service';
import {AcinterceptorService} from './interceptor/acinterceptor.service';
import {FireauthService} from './fireauth/fireauth.service';
import {AnalyticsService} from './analytics/analytics.service';
import {GenauthService} from './genauth/genauth.service';

import {environment} from '../../environments/environment';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
    ],
    declarations: [],
    providers: [
        ApiService,
        AcinterceptorService,
        {provide: HTTP_INTERCEPTORS, useClass: AcinterceptorService, multi: true},
        FireauthService,
        AnalyticsService,
        GenauthService
    ]
})
export class AccoreModule {
}
