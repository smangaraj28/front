import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { FireauthService } from '../../../accore/fireauth/fireauth.service';
import { Store, Select } from '@ngxs/store';
import { User } from '../../../feature/acauth/models/auth.model';
import { AuthState } from '../../../feature/acauth/state/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-acusermenu',
  templateUrl: './acusermenu.component.html',
  styleUrls: ['./acusermenu.component.scss']
})
export class AcusermenuComponent implements OnInit {
  isOpen: boolean = false;

  //currentUser = null;
  @Select(AuthState.getUser) user$: Observable<User>;

  @Input() currentUser = null;
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
       return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
        this.isOpen = false;
    }
  }
  
  
  constructor(private elementRef: ElementRef, private store: Store, private fauthserv: FireauthService) { }


  ngOnInit() {
    console.log('inside toolbar user menu');
    console.log(this.currentUser);
    console.log(this.currentUser.user);
    console.log(this.currentUser.email);
  }


  logout() {
    console.log("logout");
    this.fauthserv.fb_logout('',{},'');
    //this.store.dispatch(new Logout());
  }

}