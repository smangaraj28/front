import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Actions, Select, Store} from '@ngxs/store';
import {CheckSession, LoginFailed, LoginSuccess, SessionExists} from '../../state/auth.actions';
import {AlertService,} from '../../../../accommonmod/alertmod/alertcore/alert.service';
import {forkJoin, Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {FireauthService} from '../../../../accore/fireauth/fireauth.service';
import {DialogsService} from '../../../../../../src/app/accommonmod/dialogmod/dialogs.service';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../../accore/apiservice/api.service';
import {AuthRespModel} from '../../models/auth.model';
import {installation} from '../../../../../environments/environment';
import {GenericService} from '../../../../accore/genericservice/generic.service';
import {GenauthService} from '../../../../accore/genauth/genauth.service';


@Component({
    selector: 'app-login-view-detail',
    templateUrl: './login-view-detail.component.html',
    styleUrls: ['./login-view-detail.component.scss']
})
export class LoginViewDetailComponent implements OnInit {

    @Input() usertype: string;
    id1: string;
    show_prog_bar: boolean = false;
    dialogd: any;
    header_txt: string;
    sec1_btn_txt: string;
    goggle_btn_txt: string;
    reg_btn_txt: string;
    show_frgt_pass_btn: boolean;
    allParams: any;
    provider: string = 'none';
    loginbtn_click: boolean = false;
    standaloneinstall: boolean = false;
    thirpartyauth: boolean = false;
    userpasswdlgForm: FormGroup;
    errorMatcher = new CustomErrorStateMatcher();

    @Select(state => state.auth) auth$: Observable<any>;

    constructor(private store: Store,
                private actions$: Actions,
                private Alertserv: AlertService,
                private fauthserv: FireauthService,
                private genericservice: GenericService,
                private authserv: GenauthService,
                private dialog: DialogsService,
                private router: Router,
                private route: ActivatedRoute,
                private apiservice: ApiService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.id1 = this.Alertserv.get_unq_id();
        this.dialogd = this.dialog.showalert('Login', 'Login in progress');
        this.allParams = this.route.snapshot.queryParams; // allParams is an object
        this.createloginForm();
        this.set_links(this.allParams);
        this.standaloneinstall = installation.standaloneinstall;
        this.thirpartyauth = installation.thirpartyauth;

        if (this.allParams.type === 'signup') {
            this.dialogd.close();
        } else if (this.allParams.type === 'login') {
            if (this.thirpartyauth) {
                this.check_sess();
            } else {
                this.dialogd.close();
            }

        }
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                console.log('nav end');
                this.allParams = this.route.snapshot.queryParams; // allParams is an object
                this.set_links(this.allParams);
                if (this.allParams.error === 'true') {
                    console.log(this.allParams);
                    this.set_error_on_renav();
                }
            }
        });


    }

    createloginForm() {

        if (this.thirpartyauth) {
            //User id will be email
            this.userpasswdlgForm = this.fb.group({
                userid: ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
                password: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])]
            });
        } else {
            //User id will be NON email
            //TODO Validator pattern to be changed to fit user id
            this.userpasswdlgForm = this.fb.group({
                userid: ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
                password: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])]
            });
        }


    }


    login_btn_click(provier) {
        this.dialogd = this.dialog.showalert('Login', 'Login in progress');
        this.provider = provier;
        this.loginbtn_click = true;

        if (this.allParams.type === 'login') {
            if (this.thirpartyauth) {
                this.check_sess();
            } else {
                //These buttons are not shown if thirparty is FALSE
            }
        } else {
            if (this.thirpartyauth) {
                this.login_type_selector();
            } else {
                //These buttons are not shown if thirparty is FALSE
            }
        }
    }


    /* 3rd Parth Auth flow codes: START*/

    check_sess() {
        console.log('chk_sess');
        this.store.dispatch(new CheckSession()).pipe(
            withLatestFrom(this.auth$)
        ).subscribe(
            ([s, auth]) => {
                console.log('done');
                if (this.loginbtn_click) {
                    this.login_type_selector();
                } else {
                    if (auth.user) {
                        this.check_user_registered('chksessflow', auth.user);
                    } else {
                        (!this.loginbtn_click) ? this.dialogd.close() : console.log('no action');
                    }
                }
            }
        );
    }


    login_type_selector() {
        switch (this.provider) {
            case ('google'): {
                this.loginWithGoogle();
                break;
            }
        }
    }


    async check_user_registered(calledfrm, user) {


        switch (calledfrm) {

            case('loginflow'): {
                console.log('inside loginflow');
                //this.apiservice.apigettest ('http://127.0.0.1:8081/userregchk')
                this.apiservice.apiget('auth_userregchk')
                    .subscribe(
                        (resp: AuthRespModel) => {

                            if (resp.status === 'success') {
                                console.log('inside login success');
                                this.login_success(user, resp.userdetails);
                            } else {
                                console.log('else');
                                this.login_failure(resp);
                            }
                        },
                        (error) => {
                            console.log('inside login failure');
                            console.log(error);
                            this.login_failure(error);
                        },
                        () => {
                            //console.log("HTTP complete");
                        }
                    );
                break;
            }
            case('chksessflow'): {
                await this.set_token(calledfrm, user);

                //this.apiservice.apigettest ('http://127.0.0.1:8080/userregchk')
                this.apiservice.apiget('auth_userregchk')
                    .subscribe(
                        (resp: AuthRespModel) => {
                            if (resp.status === 'success') {
                                this.router.navigate(['/login/auth'], {queryParams: {'type': this.allParams.type}});
                            }
                            (!this.loginbtn_click) ? this.dialogd.close() : console.log('no action');
                        },
                        (error) => {
                            (!this.loginbtn_click) ? this.dialogd.close() : console.log('no action');
                        }
                    );
                break;
            }

        }

    }


//If user is registered we will move to auth page after updating last login time
    async login_success(user, apiuser) {
        await forkJoin(
            //This is to update store with login user
            await this.store.dispatch(new SessionExists(user.user)),
            //This is to update last login time in DB (call api)
            //this.apiservice.apigettest ('http://127.0.0.1:8080/login')
            this.apiservice.apiget('auth_login')
        ).subscribe(
            async ([res2, res]) => {
                console.log('authlogin');
                console.log(res2);
                let res1: AuthRespModel = <AuthRespModel>res;
                if (res1.status == 'fail') {
                    this.router.navigate(['/login/sess'], {queryParams: {'type': this.allParams.type}});
                    this.dialogd.close();
                } else if (res1.status == 'success') {
                    this.store.dispatch(new LoginSuccess(user.user, this.fauthserv.idtoken, this.fauthserv.tknclaims, res1.sessionid, this.genericservice.get_user_type()))
                        .subscribe((a) => {
                                this.genericservice.check_nav(res1.respdata);
                                this.router.navigate(['/login/authland']);
                                this.dialogd.close();
                            },
                            (err) => {
                                this.login_failure(err);
                            },
                            () => {
                                //console.log("store dispatch complete");
                            }
                        );
                }
            },
            async (err) => {
                await this.store.dispatch(new LoginFailed()).subscribe(
                    async (sucess) => {
                        await this.login_failure(err);
                    },
                    (error) => {
                        this.login_failure(error);
                    }
                );

            }
        );

    }

    async login_failure(errormsg) {
        await this.logout(errormsg);
    }

    //If user is registered we will move to auth page after updating last login time
    async signup_handler(url = 'auth_signup', data = {}) {
        console.log('function signup handler start');
        if (data === {}) {
            data = {'nat': 'test'};
        }
        this.apiservice.apipost(url, data)
        //this.apiservice.apiposttest ('http://127.0.0.1:8080/signup',)
            .pipe(map((response) => {
                console.log(response);
                return response.body;
            }))
            .subscribe(
                (statusmsg: AuthRespModel) => {
                    console.log(statusmsg);
                    if (statusmsg.status === 'success') {
                        this.Alertserv.update(this.id1, 'Signup successful.  Proceed to login', 'success', 'alert', 'no');
                    } else if (statusmsg.status === 'fail') {
                        this.Alertserv.update(this.id1, statusmsg.message, 'error', 'alert', 'yes');
                    } else {
                        this.Alertserv.update(this.id1, 'Technical error.  Please contact support', 'error', 'alert', 'yes');
                    }
                    this.dialogd.close();
                    if (!this.thirpartyauth) {
                        this.resetform();
                    }
                },
                (error) => {

                    if (!this.thirpartyauth) {
                        this.resetform();
                    }
                    this.Alertserv.update(this.id1, error.error.message, 'error', 'alert', 'yes');
                    this.dialogd.close();
                }
            );
    }


    async logout(errormsg?) {
        this.dialogd = this.dialog.showalert('Logout', 'Logout in progress');
        await this.fauthserv.fb_logout(errormsg ? errormsg : '', {'type': this.allParams.type}, this.id1, '/login');
    }

    /* 3rd Parth Auth flow codes: END*/


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// LOGIN AND SIGN UP TOGGLE LOGICS

    set_links(allParams) {
        if (typeof (this.allParams) !== 'undefined') {
            if (allParams.type === 'signup') {
                this.set_signup();
            } else if (allParams.type === 'login') {
                this.set_login();
            }
        } else {
            this.set_login();
        }
    }


    set_signup() {
        this.show_frgt_pass_btn = false;
        this.header_txt = 'Signup';
        this.sec1_btn_txt = 'Signup';
        this.goggle_btn_txt = 'Signup with Google';
        this.reg_btn_txt = 'Already registered? Login';
    }

    set_login() {
        this.header_txt = 'Login';
        this.sec1_btn_txt = 'Login';
        this.goggle_btn_txt = 'Login with Google';
        this.reg_btn_txt = 'Register';
        this.show_frgt_pass_btn = true;
    }


    singup_btn_click() {
        this.Alertserv.clearalertmsg();
        this.resetform();
        if (this.allParams.type === 'login') {
            console.log('inside if');
            this.router.navigate(['/login'], {queryParams: {type: 'signup'}});
        } else if (this.allParams.type === 'signup') {
            console.log('inside else');
            this.router.navigate(['/login'], {queryParams: {type: 'login'}});
        }

    }


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    set_error_on_renav() {
        if (this.fauthserv.reload_err_msg != undefined && this.fauthserv.reload_err_msg.length) {
            let e = this.fauthserv.reload_err_msg;
            this.fauthserv.reload_err_msg = '';
            this.Alertserv.update(this.id1, e, 'error', 'alert', 'yes');
        }

    }


    /* GOOGLE PROVIDER Login methods: START */

    async loginWithGoogle() {
        this.Alertserv.clearalertmsg();
        let tt = await this.fauthserv.googleLogin()
            .then(
                async user => {
                    console.log('fb login success');
                    await this.set_token('empty', user);
                }
            )
            .catch(
                err => {
                    this.login_failure(err);
                    this.dialogd.close();
                }
            );
    }


    async set_token(calledfrm: string = 'empty', user) {

        if (calledfrm === 'empty') {
            await this.fauthserv.work_on_token();
            if (this.allParams.type === 'login') {
                this.check_user_registered('loginflow', user);
            } else if (this.allParams.type === 'signup') {
                await this.signup_handler();
            }
        } else if (calledfrm === 'chksessflow') {
            await this.fauthserv.work_on_token();
        }
    }

    /* GOOGLE PROVIDER Login methods: END */

    /* 3rd party emailid password loign method: START*/
    async loginWithEmailpass() {
        this.Alertserv.clearalertmsg();
        let tt = await this.fauthserv.emailLogin(this.userpasswdlgForm.value)
            .then(
                async user => {
                    console.log('fb login success');
                    await this.set_token('empty', user);
                }
            )
            .catch(
                err => {
                    this.login_failure(err);
                    this.dialogd.close();
                }
            );

    }


    loginWithuserpassword() {
        this.Alertserv.clearalertmsg();
        if (this.thirpartyauth) {
            this.loginWithEmailpass();
        } else {
            this.loginWithEmailpass_own();
        }
    }


    /* NON 3RD PARTY FLOW : START */
    loginWithEmailpass_own() {
        console.log('inside local signin');
        console.log(this.allParams.type);
        if (this.allParams.type === 'login') {
            this.dialogd = this.dialog.showalert('Login', 'Login in progress');
            this.login_own_handler();
        } else if (this.allParams.type === 'signup') {
            this.dialogd = this.dialog.showalert('Signup', 'Signup in progress');
            this.signup_own_handler();
        }

    }


    login_own_handler() {
        this.apiservice.apipost('auth_ologin', this.userpasswdlgForm.value)
            .subscribe(
                async (res) => {
                    console.log(res.body);
                    let res1: AuthRespModel = <AuthRespModel>res.body;
                    console.log(res1);
                    this.fauthserv.own_idtoken = JSON.parse(JSON.stringify(res1.natjwt));
                    console.log(this.fauthserv.own_idtoken);
                    this.fauthserv.own_tknclaims = res1.tokenClaims;
                    this.fauthserv.own_user = res1.userdetails;
                    //this.store.dispatch(new LoginSuccess(user.user,this.fauthserv.idtoken,this.fauthserv.tknclaims,res1.sessionid,this.genericservice.get_user_type()))
                    if (res1.status == 'fail') {
                        this.store.dispatch(new SessionExists(res1.userdetails))
                            .subscribe((suc) => {
                                    this.router.navigate(['/login/sess'], {queryParams: {'type': this.allParams.type}});
                                    this.dialogd.close();
                                },
                                (err) => {
                                    this.Alertserv.update(this.id1, err, 'error', 'alert', 'yes');
                                    this.dialogd.close();
                                }
                            );

                    } else if (res1.status == 'success') {
                        await this.fauthserv.work_on_token();
                        console.log('after await');
                        this.store.dispatch(new LoginSuccess(this.fauthserv.own_user, this.fauthserv.idtoken, this.fauthserv.tknclaims, res1.sessionid, this.genericservice.get_user_type()))
                            .subscribe((a) => {
                                    this.genericservice.check_nav(res1.respdata);
                                    this.router.navigate(['/login/authland']);
                                    this.dialogd.close();
                                },
                                (err) => {
                                    this.login_failure(err);
                                },
                                () => {
                                    //console.log("store dispatch complete");
                                }
                            );

                    }


                },
                async (error) => {

                    console.log(error);
                    await this.store.dispatch(new LoginFailed()).subscribe(
                        async (sucess) => {
                            console.log(error.error.message);
                            console.log('after store');
                            await this.login_failure(error.error);
                        },
                        (error) => {
                            this.login_failure(error.error);
                        }
                    );
                    this.dialogd.close();

                }
            );
    }

    signup_own_handler() {
        console.log('inside signup own');

        this.signup_handler('auth_osignup', this.userpasswdlgForm.value);
    }

    /* NON 3RD PARTY FLOW : END */


    resetform() {
        this.userpasswdlgForm.reset();
        this.userpasswdlgForm.markAsPristine();
        this.userpasswdlgForm.markAsUntouched();
    }

}


export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
        return control && control.invalid && control.touched;
    }
}
