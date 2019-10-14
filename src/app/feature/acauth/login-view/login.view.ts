import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { installation } from '../../../../environments/environment';
import { GenericService } from 'src/app/accore/genericservice/generic.service';
import { MatTabChangeEvent } from '@angular/material/tabs';



@Component({
  selector: 'app-login-view',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.scss'],
})
export class LoginView implements AfterViewInit{

  standaloneinstall: boolean = false;

  constructor(private genericservice: GenericService) { }
  
  @ViewChild('tabGroup',{ static: false }) tabGroup;

  ngOnInit() {
    this.genericservice.set_screen_id("aclogin");
    
    this.standaloneinstall = installation.standaloneinstall;
  }

   ngAfterViewInit(): void {
      if (this.tabGroup!== undefined) {
        this.tabGroup.selectedIndex = 1;
        this.toset_usertyp(this.tabGroup.selectedIndex);
      } else {
        console.log("setting up");
        this.genericservice.set_user_type("S"); 
      }
    }

  tabClick(ev: MatTabChangeEvent) {
    console.log(ev);
    this.toset_usertyp(ev.index);
  }

  toset_usertyp(ind: number) {
    switch(ind) {
      case(0): {
        this.genericservice.set_user_type("I"); 
        break;
      }
      case(1): {
        this.genericservice.set_user_type("C"); 
        break;
      }
    }


  }

}
