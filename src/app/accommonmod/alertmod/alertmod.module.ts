import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertcompComponent } from './alertcomp/alertcomp.component';

import { AlertService } from './alertcore/alert.service';

import { AcmaterialModule } from '../../acshared/acmaterial/acmaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    AcmaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    AlertcompComponent
  ],
  exports: [
    AlertcompComponent,
  ],
  providers: [
    AlertService  // Because of this each lazy loaded module will have their own instance of notifyservice
  ]
})
export class AlertmodModule { }
