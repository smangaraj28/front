import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

// import { FirebaseauthService } from './firebaseauth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    protected headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient,
                // private auth: FirebaseauthService
    ) {
    }

    // POST request to API
    apipost(scrndfunc, data) {
        console.log(scrndfunc, data);
        console.log(environment['url_' + scrndfunc] + '/' + environment['endpt_' + scrndfunc]);
        return this.http.post(
            environment['url_' + scrndfunc] + '/' + environment['endpt_' + scrndfunc],
            data,
            {observe: 'response'}
            // {headers: this.set_http_headers(conttyp), observe: 'response', withCredentials: true}
        );
    }

    // GET request to API
    apiget(scrndfunc) {
        console.log(scrndfunc);
        return this.http.get(
            environment['url_' + scrndfunc] + '/' + environment['endpt_' + scrndfunc]
            // {headers: this.set_http_headers(conttyp), observe: 'response'}
        );
    }


    // GET request to API
    apigettest(url) {
        console.log(url);
        return this.http.get(url
            // {headers: this.set_http_headers(conttyp), observe: 'response'}
        );
    }

    // POST request to API
    apiposttest(scrndfunc, data) {
        console.log(scrndfunc, data);
        // console.log(environment['url_' + scrndfunc] + '/' + environment['endpt_' + scrndfunc]);
        return this.http.post(
            scrndfunc,
            data,
            {observe: 'response'}
            // {headers: this.set_http_headers(conttyp), observe: 'response', withCredentials: true}
        );
    }

}
