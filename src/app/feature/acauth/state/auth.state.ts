import {FireauthService} from '../../../accore/fireauth/fireauth.service';
import {ApiService} from '../../../accore/apiservice/api.service';
import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import {take, tap} from 'rxjs/operators';
import {CheckSession, LoginFailed, LoginSuccess, LogoutSuccess, SessionExists} from './auth.actions';
import {AuthStateModel, User} from '../models/auth.model';
import {DialogsService} from 'src/app/accommonmod/dialogmod/dialogs.service';

// import { AngularFireAuth } from '@angular/fire/auth';

// import * as firebase from 'firebase/app';


@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        initialized: false,
        user: null,
        token: null,
        tokenclaims: null,
        sessionid: null,
        error: null
    }
})
export class AuthState implements NgxsOnInit {

    dialogd: any;

    constructor(private store: Store, private afAuthservice: FireauthService,
                private dialog: DialogsService, private api: ApiService) {
    }

    /**
     * Selectors
     */
    @Selector()
    static getInitialized(state: AuthStateModel): boolean {
        return state.initialized;
    }

    @Selector()
    static getUser(state: AuthStateModel) {
        return state.user;
    }

    @Selector()
    static getSession(state: AuthStateModel) {
        return state.sessionid ? state.sessionid : null;
    }

    @Selector()
    static getEntity(state: AuthStateModel) {
        return state.entityid ? state.entityid : null;
    }

    @Selector()
    static getUsertype(state: AuthStateModel) {
        return state.usertype ? state.usertype : null;
    }

    /**
     * Dispatch CheckSession on start
     */
    ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    }

    /**
     * Commands
     */


    @Action(CheckSession)
    checkSession(ctx: StateContext<AuthStateModel>) {
        return this.afAuthservice.afAuth.authState.pipe(
            take(1),
            tap((user: User) => {
                if (user) {
                    ctx.patchState({
                        user: JSON.parse(JSON.stringify(user))
                    });
                    return;
                } else {
                    ctx.patchState({
                        user: null
                    });
                    return;
                }

            })
        );
    }

    @Action(LoginSuccess)
    setUserStateOnSuccess(ctx: StateContext<AuthStateModel>, event: LoginSuccess) {
        console.log('inside loginusuccess');
        console.log((event));
        ctx.patchState({
            initialized: true,
            user: JSON.parse(JSON.stringify(event.user)),
            token: JSON.parse(JSON.stringify(event.token)),
            tokenclaims: JSON.parse(JSON.stringify(event.tokenClaims)),
            sessionid: JSON.parse(JSON.stringify(event.sessionid)),
            error: null
        });
    }


    @Action(SessionExists)
    setUserOnsessionexist(ctx: StateContext<AuthStateModel>, event: LoginSuccess) {
        console.log('inside loginusuccess');
        console.log((event));
        ctx.patchState({
            user: JSON.parse(JSON.stringify(event.user))
        });
    }

    @Action(LogoutSuccess)
    setUserStateOnlogout(ctx: StateContext<AuthStateModel>) {
        console.log('inside logoutsuccess');
        console.log((event));
        ctx.patchState({
            initialized: false,
            user: null,
            token: null,
            tokenclaims: null,
            sessionid: null,
            error: null
        });
    }

    @Action(LoginFailed)
    async Setstatetnull(ctx: StateContext<AuthStateModel>) {
        await ctx.dispatch(LogoutSuccess);
    }


}
