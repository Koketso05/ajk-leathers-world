import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() public buttonClicked: EventEmitter<boolean> = new EventEmitter();

  // font awesome
  public faCheck = faCheck;
  public faTimes = faTimes;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public onYesClicked(): void {
    this.buttonClicked.emit(true);
    this.dialog.closeAll();
  }

  public onNoClicked(): void {
    this.buttonClicked.emit(false);
    this.dialog.closeAll();
  }

  // openDialog() {
  //   this.dialog.open(DialogElementsExampleDialog);
  // }

}
