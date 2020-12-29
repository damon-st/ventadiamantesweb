import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogaddiamanteComponent } from '../dialogaddiamante/dialogaddiamante.component';

@Component({
  selector: 'app-dialogimage',
  templateUrl: './dialogimage.component.html',
  styleUrls: ['./dialogimage.component.css']
})
export class DialogimageComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<DialogimageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  closeDialog(){
    this.matDialogRef.close();
  }

}
