import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Item, ItemsResolved} from '../item';


@Component({
    selector: 'app-home',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
    public drinkLists: Item;
    public foodLists: Item;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        const resolvedData: ItemsResolved = this.route.snapshot.data.resolvedData;
        // console.log('Billing', resolvedData);
        this.foodLists = resolvedData.food;
        this.drinkLists = resolvedData.drink;
    }

}
