import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { OrderResolved } from './item';
import { PosDbService } from './pos-db.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<OrderResolved> {

  constructor(private posDbService: PosDbService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<OrderResolved> {
    return this.posDbService.getOrder()
      .pipe(
        map(item => ({ order: item, error: null })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ order: null, error: message });
        })
      );
  }

}
