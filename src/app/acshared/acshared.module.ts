import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcmaterialModule } from './acmaterial/acmaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActopnavComponent } from './actopnav/actopnav.component';
import { ActoolbarComponent } from './actoolbar/actoolbar.component';
import { AcusermenuComponent } from './actoolbar/acusermenu/acusermenu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AcmaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    ActopnavComponent,
    ActoolbarComponent,
    AcusermenuComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AcmaterialModule,
    FlexLayoutModule,
    ActopnavComponent,
    ActoolbarComponent
  ]
})
export class AcsharedModule { }
