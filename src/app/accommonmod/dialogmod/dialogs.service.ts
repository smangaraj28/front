import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DisplayDialogComponent } from './display-dialog/display-dialog.component';
import { OkDialogComponent } from './ok-dialog/ok-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Injectable()
export class DialogsService {

    title: string;
    message: string;

    constructor(private dialog: MatDialog) { }

    public deletealert(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent, {
          disableClose: true
        });

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    public showalert(title: string, message: string): any {

        let dialogRef: MatDialogRef<DisplayDialogComponent>;

        dialogRef = this.dialog.open(DisplayDialogComponent, {
          disableClose: true
        });
        this.title = title;
        this.message = message;
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef;
    }

    public update_message(title: string, message: string): any {
        this.title = title;
        this.message = message;
    }


    public okalert(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<OkDialogComponent>;

        dialogRef = this.dialog.open(OkDialogComponent, {
          disableClose: true
        });

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }


    public closeall() {
      this.dialog.closeAll();
    }

}