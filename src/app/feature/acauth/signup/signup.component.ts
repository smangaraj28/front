import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from 'src/app/accommonmod/dialogmod/dialogs.service';
import { FireauthService } from '../../../accore/fireauth/fireauth.service';
import { AlertService } from 'src/app/accommonmod/alertmod/alertcore/alert.service';
import { Store, Actions,ofActionSuccessful, ofActionDispatched, ofActionCompleted, ofActionErrored } from '@ngxs/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store, private afAuth: FireauthService,private dialog: DialogsService, private alerts: AlertService) { }

  ngOnInit() {
  }

}
