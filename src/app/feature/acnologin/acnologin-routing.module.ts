import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AchomeComponent} from './achome/achome.component';


const routes: Routes = [
    {path: '', component: AchomeComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AcnologinRoutingModule {
}
