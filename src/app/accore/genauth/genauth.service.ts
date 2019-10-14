import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {ApiService} from '../apiservice/api.service';
import {Router} from '@angular/router';
import {FireauthService} from '../fireauth/fireauth.service';
import {DialogsService} from '../../accommonmod/dialogmod/dialogs.service';
import {GenericService} from '../genericservice/generic.service';

@Injectable({
    providedIn: 'root'
})
export class GenauthService {

    dialogd: any;
    allParams: any;

    constructor(private store: Store,
                private apiservice: ApiService,
                private router: Router,
                private fauthserv: FireauthService,
                private dialog: DialogsService,
                private genericservice: GenericService,) {
    }


}
