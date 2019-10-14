import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LoginSuccess, CheckSession, LoginFailed } from '../state/auth.actions';
import { AuthState } from '../state/auth.state';
import { User, AuthRespModel } from '../models/auth.model';
import { Observable } from 'rxjs';
import { FireauthService } from '../../../accore/fireauth/fireauth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  withLatestFrom } from 'rxjs/operators';
import { DialogsService } from 'src/app/accommonmod/dialogmod/dialogs.service';

import { AlertService, } from '../../../accommonmod/alertmod/alertcore/alert.service';
import { ApiService } from '../../../accore/apiservice/api.service';
import { GenericService } from '../../../accore/genericservice/generic.service';


@Component({
  selector: 'app-login-usr-conf',
  templateUrl: './login-usr-conf.component.html',
  styleUrls: ['./login-usr-conf.component.scss']
})
export class LoginUsrConfComponent implements OnInit {

  id1: string;
  allParams:any;
  compuser:any;

  @Select(state => state.auth) auth$: Observable<any>;

  @Select(AuthState.getUser)
  user$: Observable<User>
  user:User;

  constructor(private store: Store,
              private fauthserv: FireauthService,
              private Alertserv: AlertService,
              private apiservice: ApiService,
              private genericservice: GenericService,
              private dialog: DialogsService,
              private route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit() {  
    this.id1 = this.Alertserv.get_unq_id();
    this.work_on_param();
    this.set_token();
    this.compuser = this.store.selectSnapshot(AuthState.getUser);
  }

  work_on_param() {
    this.allParams = this.route.snapshot.queryParams; // allParams is an object
    if (this.allParams.type === 'signup') {
      this.router.navigate(['/login/auth'], { queryParams: { 'type': 'signup' } });
    }
  }

  async set_token() {
    await this.fauthserv.work_on_token();
  }


  proceed(user) {
    if (this.allParams.type == 'login') {
      this.store.dispatch(new CheckSession()).pipe(
        withLatestFrom(this.auth$)
      ).subscribe(              
        async ([s,auth]) => {
                    if (auth.user) {
                      if(this.compuser.uid === auth.user.uid) {
                        await this.set_token();
                        this.login_success(user,auth);
                      } else {
                        this.router.navigate(['/login'], { queryParams: { 'type': this.allParams.type } });
                      }
                    } else {
                      this.router.navigate(['/login'], { queryParams: { 'type': this.allParams.type } });
                    }                     
                  }
      );
    }

  }


//If user is registered we will move to auth page after updating last login time
async login_success(user,apiuser) {
  console.log("function login success start");
  //await forkJoin(
    //This is to update store with login user
    //await this.store.dispatch(new LoginSuccess(user,this.fauthserv.idtoken,this.fauthserv.tknclaims,sessionid)),
    //This is to update last login time in DB (call api)
    //this.apiservice.apigettest ('http://127.0.0.1:8080/login')
    this.apiservice.apiget ('auth_login')
    .subscribe ( 
    async (res1: AuthRespModel) => {
                        if (res1.status == 'fail') {
                          this.router.navigate(['/login/sess'], { queryParams: { 'type': this.allParams.type } });
                        } else if (res1.status == 'success') {
                        this.store.dispatch(new LoginSuccess(user,this.fauthserv.idtoken,this.fauthserv.tknclaims,res1.sessionid,this.genericservice.get_user_type()))
                        .subscribe ((a) => {
                                        this.genericservice.check_nav(res1.respdata);
                                        this.router.navigate(['/login/authland']);
                                        },
                                        
                                    (err) => {
                                      this.login_failure(err);
                                    }
                        );
                        }
                      },
    async (err) =>          {
                        console.log("forkjoin on first error and all subscription cancelled");
                        await this.store.dispatch(new LoginFailed()).subscribe (
                          async (sucess) => {
                                        await this.login_failure(err);
                                      },
                          (error) =>  {
                                        this.login_failure(err);
                                      }
  
                        );
                                          
                      }
  );
  
  }



async login_failure(errormsg) {
  await this.logout(errormsg);
}

async logout(errormsg?) {
  await this.fauthserv.fb_logout(errormsg='',{'type': this.allParams.type}, this.id1, '/login');
}

changeuser() {
    if (this.allParams != 'signup') {
      this.logout();
    }
  }
}
