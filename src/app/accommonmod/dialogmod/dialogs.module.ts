import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DisplayDialogComponent } from './display-dialog/display-dialog.component';
import { OkDialogComponent } from './ok-dialog/ok-dialog.component';

import { DialogsService } from './dialogs.service';

// import { MatButtonModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { AcsharedModule } from '../../acshared';

// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    AcsharedModule
   // MaterialModule,
   // FlexLayoutModule
  ],
  declarations: [ConfirmDialogComponent, DisplayDialogComponent, OkDialogComponent],
  exports: [],
  entryComponents: [ConfirmDialogComponent, DisplayDialogComponent, OkDialogComponent],
  providers: [DialogsService]
})
export class DialogsModule { }