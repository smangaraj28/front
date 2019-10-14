import {ApplicationRef, Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {LogoutSuccess} from '../../feature/acauth/state/auth.actions';
import {Store} from '@ngxs/store';
import {ApiService} from '../apiservice/api.service';
import {DialogsService} from 'src/app/accommonmod/dialogmod/dialogs.service';
import {AlertService,} from '../../accommonmod/alertmod/alertcore/alert.service';
import {Router} from '@angular/router';
import {AuthRespModel} from '../../feature/acauth/models/auth.model';
import {installation} from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class FireauthService {

    user: firebase.User;
    idtoken: string;
    tknclaims: any;
    isLoginProgress = false;
    reload_err_msg: string;

    // These are set from login_view for non third party
    own_idtoken: any;
    own_tknclaims: any;
    own_user: any;

    private errorsubject = new Subject();
    public error$ = this.errorsubject.asObservable();


    private currentUserSubject = new BehaviorSubject<firebase.User>({} as firebase.User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private app: ApplicationRef,
                public afAuth: AngularFireAuth,
                private store: Store,
                private apiservice: ApiService,
                private Alertserv: AlertService,
                private dialog: DialogsService,
                private router: Router,
    ) {
        /* this.afAuth.authState.subscribe (
        (user) => {
          //let nt = this.store.dispatch(new CheckSession());

            let sesuid = sessionStorage.getItem('user');
            if(user && !this.isLoginProgress){
              if (user.uid === sesuid && sesuid !== '{}') {
                this.setLoginStat();
                console.log("user");
              } else {
                this.setLogOutStat();
                console.log("user else");
              }
            }

          },
          (err) => {
            this.setLogOutStat();
          }
        );*/
    }

    /*
     async setLoginStat() {
       await this.refresh_id_token();
       sessionStorage.setItem('user', this.afAuth.auth.currentUser.uid);
       this.currentUserSubject.next(this.afAuth.auth.currentUser);
       //this.user =   this.afAuth.auth.currentUser;
       this.isAuthenticatedSubject.next(true);
       this.app.tick();
       console.log("setLoginStat");
     }

     async setLogOutStat() {
       sessionStorage.setItem('user', '{}');
       //this.user = null;
       this.currentUserSubject.next({} as firebase.User);
       this.idtoken = null;
       this.isAuthenticatedSubject.next(false);
       this.app.tick();
       //Land in home page
       console.log("setLogOutStat");
     }
   */

    async fire_logout() {
        console.log('before log out in service');
        return await this.afAuth.auth.signOut();
    }

    /*
    async logOut() {
      await this.afAuth.auth.signOut().then (
        () => {
                console.log("logout ");
                let nt = this.store.dispatch(new LogoutSuccess());
                this.setLogOutStat();
              },
      (error) => {
                    console.log("logout error");
                }
      );


    }
  */
    /* All Login functions  START */

    // federated identity providers specific Login method
    async googleLogin() {
        const provider = new auth.GoogleAuthProvider();
        return await this.login(provider);
    }

    // email and password specific Login method
    async emailLogin(useridpass) {
        return await this.afAuth.auth.signInWithEmailAndPassword(useridpass['email'], useridpass['password']);
    }

    // Generic method called by all federated identity providers login (ie.. google, fb, etc...)
    // Each component implements success failure subscriptions
    // and calls login_success or login_failure accordingly
    async login(provider) {
        return await this.afAuth.auth.signInWithPopup(provider);
    }

    /*
    // Login success handler
    async login_success(user,method) {
      console.log("before");
      let tt: any;

      let myindex = await this.checkifemailexists(user,method)
      .then (
          async (myindex) => {
            if (myindex < 0){
              console.log(myindex);
            } else {
              console.log('login success step1');
              //tt =  await this.store.dispatch(new LoginSuccess(user.user)).toPromise();
              console.log('login success step2');
              await this.work_on_token();
              console.log("after");
            }
          }
      )
      .catch (
            (err) => {console.log(err);}
      );
      tt=0;
      console.log('login success step9');
      return tt;

      }
  */

    async work_on_token() {
        if (installation.thirpartyauth) {
            await this.refresh_id_token()
                .then(async (idToken) => {
                    this.idtoken = idToken;
                    await this.set_id_tkn_result();
                }).catch(function (error) {
                    this.idToken = '';
                });
        } else {
            this.idtoken = this.own_idtoken === '' ? '' : this.own_idtoken;
            await this.set_id_tkn_result();
        }

    }

    async set_id_tkn_result() {
        if (installation.thirpartyauth) {
            await this.get_id_tkn_result()
                .then((idTokenResult) => {

                    this.tknclaims = idTokenResult.claims;
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            this.tknclaims = this.own_tknclaims === '' ? '' : this.own_tknclaims;
        }
        console.log('after await all');
    }


    /*
  // Login failure handler
  async login_failure(err) {
    let nt = this.store.dispatch(new LoginFailed(err));
  }

/* All Login functions  END */


    /* SIGN UP methods START */

    async emailSignUp(useridpass) {
        return await this.afAuth.auth.createUserWithEmailAndPassword(useridpass['email'], useridpass['password']);
        /* console.log(nat);
           return nat;*/
    }

    /*
    async checkifemailexists(email:string, provider:string | 'google.com' | 'password')  {
      //return await this.afAuth.auth.fetchSignInMethodsForEmail(email);
      let ind:number;
      let tt = await this.afAuth.auth.fetchSignInMethodsForEmail('natrayanp@gmail.com')
      .then((signinmethods) => {
                        console.log(signinmethods);
                        var index = signinmethods.indexOf(provider);
                        console.log(index);
                        ind = index;
                      }
            )
      .catch ( (err) => {

        console.log(err);
        console.log("3333333333333err");
        ind = -1;

                        }
            );
        return ind;
    }
    */

    /* SIGN UP methods END */

    async refresh_id_token() {
        return await this.afAuth.auth.currentUser.getIdToken(/* forceRefresh */ false);
    }

    /*
      // If error, console log and notify user
      private handleError(error: Error) {
        console.error(error);
        this.errorsubject.next(error);
        let nt = this.store.dispatch(new LoginFailed(error));
      }
    */
    async get_id_tkn_result() {
        return await this.afAuth.auth.currentUser.getIdTokenResult(true);
    }

    public get_id_token() {
        return this.idtoken;
    }


    async fb_logout(errormsg, paramtype = {}, alertid, route = '/home') {
        console.log(errormsg);
        console.log(paramtype);
        console.log(typeof (paramtype));
        //paramtype = {'type' : 'login'};
        if (installation.thirpartyauth) {
            await this.fire_logout()
                .then(
                    (a) => {
                        console.log(errormsg);
                        this.logout_final(errormsg, paramtype, alertid, route);
                    }
                )
                .catch(
                    (e) => {
                        console.log(e);
                        this.logout_final(errormsg, paramtype, alertid, route);
                    }
                );
        } else {
            console.log('outside thirdpart in fb_logout');
            this.logout_final(errormsg, paramtype, alertid, route);
        }


    }


    logout_final(errormsg, paramtype, alertid, route) {
        let au = this.store.selectSnapshot((state) => state.auth);
        console.log('inside logout_final');
        console.log(au);
        if (au.sessionid) {
            console.log('Inside if of logut_final');
            //this.apiservice.apigettest ('http://127.0.0.1:8080/logout')
            this.apiservice.apiget('auth_logout')
                .subscribe(
                    (res1: AuthRespModel) => {
                        this.store.dispatch(new LogoutSuccess());
                        (paramtype == {} ? this.router.navigate([route]) : this.router.navigate([route], {queryParams: {paramtype}}));
                        this.dialog.closeall();
                    },
                    (errormsg) => {
                        this.store.dispatch(new LogoutSuccess());
                        (paramtype == {} ? this.router.navigate([route]) : this.router.navigate([route], {queryParams: {paramtype}}));
                        this.Alertserv.update(alertid, (errormsg === {} ? {} : errormsg.message), 'error', 'alert', 'yes');
                        this.dialog.closeall();
                    }
                );
        } else {
            console.log('Inside else of logut_final');
            console.log();
            paramtype.error = true;
            this.store.dispatch(new LogoutSuccess());
            this.reload_err_msg = errormsg.message;
            this.router.navigate([route], {queryParams: paramtype});
            //this.Alertserv.update(alertid,(errormsg === {}? {} : errormsg.message),'error','alert','yes');
            this.dialog.closeall();
        }
        this.own_idtoken = '';
        this.own_tknclaims = '';
        this.own_user = '';
    }


}
