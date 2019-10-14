import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-display-dialog',
  templateUrl: './display-dialog.component.html',
  styleUrls: ['./display-dialog.component.scss']
})
export class DisplayDialogComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<DisplayDialogComponent>) {

  }

}