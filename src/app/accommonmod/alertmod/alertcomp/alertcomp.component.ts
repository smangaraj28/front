import { Component, SecurityContext, OnInit, Input } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'
import { AlertService } from '../alertcore/alert.service';

@Component({
  selector: 'app-alertcomp',
  templateUrl: './alertcomp.component.html',
  styleUrls: ['./alertcomp.component.scss']
})
export class AlertcompComponent implements OnInit {

  @Input() public id: string;
  alert_id: string;
  private subscription: any;

  constructor(public notify: AlertService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('insider alerts');
    console.log(this.id);
    this.alert_id = this.id;
 }

 sanitizemy(html) {
   return this.sanitizer.sanitize(SecurityContext.HTML, html);
  //return this.sanitizer.bypassSecurityTrustStyle(html);
 }

}