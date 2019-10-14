import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../item';
import {PosService} from '../pos.service';
import {of} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';

@Component({
    selector: 'app-pos',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
    @Input() food: any;
    @Input() drink: any;
    products = [];
    productTypes = ['Drink', 'Food'];
    ticket: Item[];
    cartTotal = 0;
    cartNumItems = 0;
    items;

    constructor(private ticketSync: PosService, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
        this.ticketSync.currentTotal.subscribe(total => this.cartTotal = total);
        this.ticketSync.currentCartNum.subscribe(num => this.cartNumItems);
        this.products[0] = of(this.drink);
        this.products[1] = of(this.food);
    }

    addToCheck(item: Item) {
        this.openSnackBar(item.itemName, 'add-to-check-css');
        if (this.ticket.includes(item)) {
            this.ticket[this.ticket.indexOf(item)].itemQuantity += 1;
        } else {
            this.ticket.push(item);
        }
        this.calculateTotal();
    }

    // Calculate cart total
    calculateTotal() {
        let total = 0;
        let cartNum = 0;
        // Multiply item itemPrice by item itemQuantity, add to total
        this.ticket.forEach((item: Item) => {
            total += (item.itemPrice * item.itemQuantity);
            cartNum += item.itemQuantity;
        });
        this.cartTotal = total;
        this.cartNumItems = cartNum;
        this.ticketSync.updateNumItems(this.cartNumItems);
        this.ticketSync.updateTotal(this.cartTotal);
    }

    syncTicket() {
        this.ticketSync.changeTicket(this.ticket);
    }

    private openSnackBar(message: string, cssClass: string) {
        this.snackBar.openFromComponent(SnackBarComponent, {
            data: message + ' Selected' + ' party!!! 🍕',
            panelClass: cssClass,
            duration: 4000
        });
    }
}
