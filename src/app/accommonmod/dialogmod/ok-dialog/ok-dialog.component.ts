import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-ok-dialog',
  templateUrl: './ok-dialog.component.html',
  styleUrls: ['./ok-dialog.component.scss']
})
export class OkDialogComponent  {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<OkDialogComponent>) {}
}