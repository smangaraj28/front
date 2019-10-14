import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AuthState} from './state/auth.state';
import {LoginView} from './login-view/login.view';
import {AcauthRoutingModule} from './acauth-routing.module';
import {AlertmodModule} from '../../accommonmod/alertmod';
import {AcsharedModule} from '../../acshared';
import {LoginUsrConfComponent} from './login-usr-conf/login-usr-conf.component';
import {AuthSuccessComponent} from './authsuccess/auth-success.component';
import {SignupComponent} from './signup/signup.component';
import {LoginSessConfComponent} from './login-sess-conf/login-sess-conf.component';
import {LoginViewDetailComponent} from './login-view/login-view-detail/login-view-detail.component';

@NgModule({
    imports: [
        CommonModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AcauthRoutingModule,
        AlertmodModule,
        NgxsModule.forFeature([
            AuthState,
        ]),
        AcsharedModule
    ],
    declarations: [
        LoginView,
        LoginUsrConfComponent,
        AuthSuccessComponent,
        SignupComponent,
        LoginSessConfComponent,
        LoginViewDetailComponent
    ],
    providers: []
})
export class AuthModule {
}
