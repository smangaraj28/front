import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AcsharedModule} from '../../../acshared';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PosComponent} from './pos/pos.component';
import {TicketComponent} from './ticket/ticket.component';
import {ItemsComponent} from './items/items.component';
import {HistoryComponent} from './history/history.component';
import {LineItemModalComponent} from './history/line-item-modal/line-item-modal.component';
import {ItemsResolver} from './items-resolver.service';
import {OrderResolver} from './order-resolver.service';
import {SnackBarComponent} from './snack-bar/snack-bar.component';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {BillingComponent} from './billing/billing.component';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'billing',
        pathMatch: 'full'
    },
    {
        path: 'billing',
        component: BillingComponent,
        resolve: {resolvedData: ItemsResolver}
    },
    {
        path: 'add',
        component: ItemsComponent,
        resolve: {resolvedData: ItemsResolver}
    },
    {
        path: 'transactions',
        component: HistoryComponent,
        resolve: {resolvedOrder: OrderResolver}
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        AcsharedModule,
        RouterModule.forChild(DASHBOARD_ROUTES)
    ],
    declarations: [
        BillingComponent,
        PosComponent,
        TicketComponent,
        ItemsComponent,
        HistoryComponent,
        LineItemModalComponent,
        SnackBarComponent
    ],
    entryComponents: [
        LineItemModalComponent,
        SnackBarComponent
    ],
    providers: [{provide: MAT_SNACK_BAR_DATA, useValue: {}}],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PosModule {
}
