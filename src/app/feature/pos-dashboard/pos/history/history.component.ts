import {Component, OnInit} from '@angular/core';
import {LineItemModalComponent} from './line-item-modal/line-item-modal.component';
import {MatDialog} from '@angular/material';
import {of} from 'rxjs';
import {Order} from '../item';
import {PosDbService} from '../pos-db.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

    history: any;

    constructor(public dialog: MatDialog, private posDb: PosDbService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        const resolvedData = this.route.snapshot.data.resolvedOrder;
        if (resolvedData === undefined) {
            this.history = of(this.posDb.savedTransactions);
        } else {
            this.history = of(this.route.snapshot.data.resolvedOrder.order);
        }
    }

    openDialog(lineItem: Order): void {
        const dialogRef = this.dialog.open(LineItemModalComponent, {
            width: '530px',
            data: {
                numItems: lineItem.orderCartNumItems,
                orderDate: lineItem.orderDate,
                items: lineItem.orderItems,
                total: lineItem.orderCartTotal
            }
        });
    }

    o;

}
