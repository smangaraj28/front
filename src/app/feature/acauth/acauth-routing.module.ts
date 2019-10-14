import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginUsrConfComponent} from './login-usr-conf/login-usr-conf.component';
import {LoginSessConfComponent} from './login-sess-conf/login-sess-conf.component';
import {LoginView} from './login-view/login.view';
import {AuthSuccessComponent} from './authsuccess/auth-success.component';


const routes: Routes = [
    // { path: '', component: LoginUsrConfComponent, canActivate: [ AuthenticatedGuard ]  } ,
    {path: 'authland', component: AuthSuccessComponent /*, canActivate: [ AuthenticatedGuard ]*/},
    // { path: 'auth', component: LoginView }
    {path: '', component: LoginView},
    {path: 'auth', component: LoginUsrConfComponent},
    {path: 'sess', component: LoginSessConfComponent}

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AcauthRoutingModule {
}
