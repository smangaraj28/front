import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PosDashboardViewComponent} from './pos-dashboard-view.component';
import {RouterModule, Routes} from '@angular/router';
import {PosSideMenuComponent} from './pos-side-menu/pos-side-menu.component';
import {PosSideMenuItemsComponent} from './pos-side-menu-items/pos-side-menu-items.component';
import {PosDashboardSidenavComponent} from './pos-dashboard-sidenav/pos-dashboard-sidenav.component';
import {AcsharedModule} from '../../acshared';
import {PosTopNavComponent} from './pos-top-nav/pos-top-nav.component';
import {PosToolBarComponent} from './pos-tool-bar/pos-tool-bar.component';
import {PosUserMenuComponent} from './pos-tool-bar/pos-user-menu/pos-user-menu.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '', component: PosDashboardViewComponent,
        children: [
            {
                path: '',
                redirectTo: 'pos',
                pathMatch: 'full'
            },
            {
                path: 'pos',
                loadChildren: () => import('./pos/pos.module').then(m => m.PosModule)
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        AcsharedModule,
        RouterModule.forChild(DASHBOARD_ROUTES)
    ],
    declarations: [
        PosDashboardViewComponent,
        PosSideMenuComponent,
        PosSideMenuItemsComponent,
        PosDashboardSidenavComponent,
        PosTopNavComponent,
        PosToolBarComponent,
        PosUserMenuComponent
    ]
})
export class PosDashboardModule {
}
