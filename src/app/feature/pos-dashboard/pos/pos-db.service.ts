import {Injectable} from '@angular/core';
import {Item, Order} from './item';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {formatDate} from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class PosDbService {
    private posUrl = '/billings';
    private itemUrl = '/items';
    private orderUrl = '/order';
    private uploadUrl = '/itemupload';
    private getUploadUrl = '/getupload';
    public savedTransactions = [];

    constructor(private http: HttpClient) {
    }

    saveOrder(ticket: Item[], cartTotal: number, cartNumItems: number) {
        // console.log(ticket, cartTotal, cartNumItems);
        const today = new Date();
        const jstoday = formatDate(today, 'MM-dd-yyyy hh:mm a', 'en-US', '+0530');
        const obj = {
            orderDate: jstoday,
            orderItems: ticket,
            orderCartTotal: cartTotal,
            orderCartNumItems: cartNumItems
        };
        this.savedTransactions.push(obj);
        // console.log(this.savedTransactions);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.posUrl, obj, {headers})
            .pipe(
                // tap(data => console.log('Save Order: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteItem(id) {
        console.log(id);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = `${this.itemUrl}/${id}`;
        return this.http.delete(url, {headers})
            .pipe(
                tap(data => console.log('Delete Item: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    updateItem(obj) {
        console.log(obj);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put(this.itemUrl, obj, {headers})
            .pipe(
                tap(data => console.log('Update Item: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    pushUpload(newItemName: string, newItemPrice: number, newItemType: string, currentUpload: any) {
        // console.log(newItemName, newItemPrice, newItemType, currentUpload);
        const obj = {
            itemName: newItemName,
            itemPrice: newItemPrice,
            itemType: newItemType
        };
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put(this.uploadUrl, obj, {headers: headers}).subscribe(
            data => this.http.post(this.uploadUrl, currentUpload, {
                reportProgress: true,
                observe: 'events'
            }).subscribe(data2 => {
                console.log(data2);
                console.log(data);
            }));
        // let response1 = this.http.put(this.uploadUrl, obj, {headers: headers});
        // let response2 = this.http.post(this.uploadUrl, currentUpload, {headers: headers});
        // return forkJoin([response1, response2]);
    }

    getItems(): Observable<Item> {
        return this.http.get<Item>(this.itemUrl)
            .pipe(
                // tap(data => console.log('Items List: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getOrder(): Observable<Order> {
        return this.http.get<Order>(this.orderUrl).pipe(
            // tap(data => console.log('Order List: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

    getUpload(name: any) {
        const obj = {
            filename: name
        };
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.post(this.getUploadUrl, obj, {headers: headers}).subscribe(data => console.log(data));
    }
}
