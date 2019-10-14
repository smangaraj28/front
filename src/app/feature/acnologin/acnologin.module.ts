import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcnologinRoutingModule } from './acnologin-routing.module';
import { AchomeComponent } from './achome/achome.component';
import { AccoreModule } from '../../accore';
import { AcsharedModule } from '../../acshared';
import { AlertmodModule } from '../../accommonmod/alertmod/alertmod.module';


@NgModule({
  imports: [
    CommonModule,
    AcnologinRoutingModule,
    AcsharedModule,
    AccoreModule,
    AlertmodModule
  ],
  declarations: [AchomeComponent]
})
export class AcnologinModule { }
