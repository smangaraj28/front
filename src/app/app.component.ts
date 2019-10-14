import { Component } from '@angular/core';
import { installation } from '../environments/environment';
import { Store, Select } from '@ngxs/store';
import { setAppDefaults } from './state/app.actions';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';



import { AnalyticsService } from '../app/accore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private analytics: AnalyticsService, private store: Store, private router: Router) {
  }

  ngOnInit() {

   const defaultval = {
    'entityid': '',
    'countryid': ''
   }
   // Navigation end event is added to avoid the issue of 
   // navigation fired by store and by angular at the same time and failing.
   // Old code is commented here
        //this.store.dispatch(new setAppDefaults(defaultval));
        //this.analytics.trackPageViews();
   this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    )
    .subscribe(() => {
      if (this.router.url === "/") {
        console.log("inside analtics" + this.router.url);
        this.store.dispatch(new setAppDefaults(defaultval));
        this.analytics.trackPageViews();
      }

    });

  }
}
