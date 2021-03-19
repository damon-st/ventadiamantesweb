import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiamanteI } from 'src/app/models/diamante';

@Component({
  selector: 'app-dialogaddiamante',
  templateUrl: './dialogaddiamante.component.html',
  styleUrls: ['./dialogaddiamante.component.css']
})
export class DialogaddiamanteComponent implements OnInit {

  value = '';
  isEmpty: boolean = false;
  constructor(private matDialogRef: MatDialogRef<DialogaddiamanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiamanteI) { }

  ngOnInit(): void {
  }


  onNoClick(data: DiamanteI): void{
    if(data.descripcion === '' || data.precio === 0){
      this.isEmpty = true;
    }else{
      this.isEmpty = false;
      this.matDialogRef.close(data);
    }
  }
}
