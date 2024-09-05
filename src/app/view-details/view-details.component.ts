import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<ViewDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
