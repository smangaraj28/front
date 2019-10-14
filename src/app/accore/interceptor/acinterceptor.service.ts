import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {installation} from '../../../environments/environment';

import {GenericService} from '../genericservice/generic.service';
import {FireauthService} from '../fireauth/fireauth.service';
import {Store} from '@ngxs/store';
import {AuthState} from '../../feature/acauth/state/auth.state';


// import session service
@Injectable({
    providedIn: 'root'
})
export class AcinterceptorService {


    authReq: any;
    hasidtkn: boolean;
    hassess: boolean;
    haschg: boolean;
    isaddtkn = true;
    idtkn: string;
    sess = null;
    skip = false;
    ustype: string;

    headers: HttpHeaders = new HttpHeaders();

    constructor(/*private ses_serv: session_service*/
                private genericservice: GenericService,
                private fbauthservice: FireauthService,
                private store: Store
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.isaddtkn = true;
        this.skip = false;
        console.log(req.url);

        const entityid = this.store.selectSnapshot(AuthState.getEntity);

        if (entityid !== null) {
            this.headers = this.setHeader(this.headers, 'entityid', entityid);
        }
        // const countryid = installation.countryid;
        const screenid = this.genericservice.get_screen_id();

        console.log(entityid);
        // console.log(countryid);
        console.log(screenid);
        console.log(installation.thirpartyauth);


        this.headers = this.setHeader(this.headers, 'thirdparty', installation.thirpartyauth.toString());
        this.headers = this.setHeader(this.headers, 'screenid', screenid);


        this.sess = this.store.selectSnapshot(AuthState.getSession);

        if (this.sess !== null) {
            this.headers = this.setHeader(this.headers, 'mysession', this.sess);
        }

        const urlendstring = ['osignupnotkn', 'userregchk', 'signup', 'signupnotkn', 'ologin', 'loginks'];

        if ((this.check_url_present(urlendstring, req))) {
            this.ustype = this.genericservice.get_user_type();
        } else {
            this.ustype = this.store.selectSnapshot(AuthState.getUsertype);
        }

        console.log(this.ustype);
        if (this.ustype !== null) {
            this.headers = this.setHeader(this.headers, 'usertype', this.ustype);
        }

        console.log(this.headers);

        // Conditions to skip setting up token
        const notknurlendstring = ['osignupnotkn', 'signup', 'signupnotkn', 'ologin'];
        if (this.check_url_present(notknurlendstring, req)) {
            console.log('inside check ');
            if (installation.thirpartyauth) {
                this.isaddtkn = true;
            } else {
                this.isaddtkn = false;
            }
        }
        // Conditions to skip setting up token

        if (this.isaddtkn /*|| other cases*/) {
            this.skip = false;
        }

        console.log(this.isaddtkn);
        console.log(this.skip);

        if (!this.skip) {

            if (this.isaddtkn) {
                console.log('token id start');
                this.idtkn = this.fbauthservice.get_id_token();
                console.log('token id end');
                console.log(this.idtkn);
                console.log((this.idtkn) !== undefined);
                if ((this.idtkn) !== undefined) {
                    this.headers = this.setHeader(this.headers, 'Authorization', 'Bearer ' + this.idtkn);
                }
            }


            req = req.clone({headers: this.headers});
            console.log('all done');
            return next.handle(req);
        } else {
            req = req.clone({headers: this.headers});
            return next.handle(req);
        }
    }


    setHeader(headers, key, value) {
        return headers.set(key, value);
    }

    check_url_present(urlarray: string[], req: HttpRequest<any>): boolean {
        let isurlpresent = false;
        urlarray.forEach((ues) => {
            const r = req.url.endsWith(ues);
            if (!isurlpresent) {
                isurlpresent = r;
            }
        });
        return isurlpresent;
    }


}
