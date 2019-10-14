import {Component, Input, OnInit} from '@angular/core';
import {Menus} from './pos-menu-element';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pos-side-menu',
  templateUrl: './pos-side-menu.component.html',
  styleUrls: ['./pos-side-menu.component.scss']
})
export class PosSideMenuComponent implements OnInit {

  @Input() iconOnly = false;
  public menus = Menus;


  userobservable: Subscription;

  constructor() {
  }


  ngOnInit() {
  }

}
