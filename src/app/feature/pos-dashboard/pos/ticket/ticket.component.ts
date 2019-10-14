import { Component, OnInit } from '@angular/core';
import { PosService } from '../pos.service';
import { Item } from '../item';
import { PosDbService } from '../pos-db.service';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ticket: Item[] = [];
  cartTotal = 0;
  cartNumItems = 0;
  private errorMessage: any;

  constructor(private ticketSync: PosService, private posDb: PosDbService,
              private snackBar: MatSnackBar) {
  }

  // Sync with ticketSync service on init
  ngOnInit() {
    this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
    this.ticketSync.currentTotal.subscribe(total => this.cartTotal = total);
    this.ticketSync.currentCartNum.subscribe(num => this.cartNumItems = num);
  }

  // Add item to ticket.
  addItem(item: Item) {
    // If the item already exists, add 1 to itemQuantity
    if (this.ticket.includes(item)) {
      this.ticket[this.ticket.indexOf(item)].itemQuantity += 1;
    } else {
      this.ticket.push(item);
    }
    this.syncTicket();
    this.calculateTotal();
  }

  // Remove item from ticket
  removeItem(item: Item) {
    // Check if item is in array
    if (this.ticket.includes(item)) {
      // Splice the element out of the array
      const index = this.ticket.indexOf(item);
      if (index > -1) {
        // Set item itemQuantity back to 1 (thus when read, itemQuantity isn't 0)
        this.ticket[this.ticket.indexOf(item)].itemQuantity = 1;
        this.ticket.splice(index, 1);
      }
    }
    this.syncTicket();
    this.calculateTotal();
  }

  // Reduce itemQuantity by one
  subtractOne(item: Item) {
    // Check if last item, if so, use remove method
    if (this.ticket[this.ticket.indexOf(item)].itemQuantity === 1) {
      this.removeItem(item);
    } else {
      this.ticket[this.ticket.indexOf(item)].itemQuantity = this.ticket[this.ticket.indexOf(item)].itemQuantity - 1;
    }
    this.syncTicket();
    this.calculateTotal();
  }

  // Calculate cart total
  calculateTotal() {
    let total = 0;
    let cartitems = 0;
    // Multiply item itemPrice by item itemQuantity, add to total
    this.ticket.forEach((item: Item) => {
      total += (item.itemPrice * item.itemQuantity);
      cartitems += item.itemQuantity;
    });
    this.cartTotal = total;
    this.cartNumItems = cartitems;
    // Sync total with ticketSync service.
    this.ticketSync.updateNumItems(this.cartNumItems);
    this.ticketSync.updateTotal(this.cartTotal);
  }

  // Remove all orderItems from cart
  clearCart() {
    this.openSnackBar('Cart Cleared', 'clear-cart-css');
    // Reduce back to initial itemQuantity (1 vs 0 for re-add)
    this.ticket.forEach((item: Item) => {
      item.itemQuantity = 1;
    });
    // Empty local ticket variable then sync
    this.ticket = [];
    this.syncTicket();
    this.calculateTotal();
  }

  syncTicket() {
    this.ticketSync.changeTicket(this.ticket);
  }

  checkout() {
    if (this.ticket.length > 0) {
      const ticketCopy = [];
      // this.ticket.map((value, index, array) => {
      //   delete value.itemImgName;
      //   delete value.itemImgUrl;
      //   ticketCopy.push(value);
      // });
      this.ticket.forEach((item: Item) => {
        const obj: Item = {
          itemId: item.itemId,
          itemName: item.itemName,
          itemType: item.itemType,
          itemPrice: item.itemPrice,
          itemQuantity: item.itemQuantity
        };
        ticketCopy.push(obj);
      });
      this.posDb.saveOrder(ticketCopy, this.cartTotal, this.cartNumItems).subscribe(
        () => this.onSaveComplete(`The Transaction was saved`),
        (error: any) => this.errorMessage = error as any
      );
      this.clearCart();
    }
  }

  private onSaveComplete(s: string) {
    this.openSnackBar(s, 'checkout-css');
  }

  private openSnackBar(message: string, cssClass: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: cssClass,
      duration: 4000
    });
  }
}
