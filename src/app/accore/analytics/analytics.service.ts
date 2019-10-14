import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {filter} from 'rxjs/operators';
import {analytics} from 'src/environments/environment';

declare const ga: Function;

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    private enabled: boolean;

    constructor(private location: Location, private router: Router) {
        this.enabled = analytics.analytics_enabled;
    }

    trackPageViews() {
        if (this.enabled) {
            this.router.events.pipe(
                filter((event) => event instanceof NavigationEnd),
            )
                .subscribe(() => {
                    console.log('inside analtics' + this.router.url);
                    ga('send', {hitType: 'pageview', page: this.router.url});
                });
        }
    }

    trackEvent(eventCategory: string,
               eventAction: string,
               eventLabel: string,
               eventValue: string) {
        if (this.enabled) {
            ga('send', 'event', {
                eventCategory: eventCategory,
                eventLabel: eventLabel,
                eventAction: eventAction,
                eventValue: eventValue
            });
        }
    }


}
