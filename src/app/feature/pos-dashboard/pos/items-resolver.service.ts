import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ItemsResolved } from './item';
import { PosDbService } from './pos-db.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsResolver implements Resolve<ItemsResolved> {

  constructor(private posDbService: PosDbService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ItemsResolved> {
    return this.posDbService.getItems()
      .pipe(
        map(item => ({ food: item[`food`], drink: item[`drink`], error: null })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ item: null, drink: null, error: message });
        })
      );
  }

}
