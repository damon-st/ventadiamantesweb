import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiamanteI } from 'src/app/models/diamante';
import { DiamantesService } from 'src/app/services/diamantes.service';

@Component({
  selector: 'app-edtiprice',
  templateUrl: './edtiprice.component.html',
  styleUrls: ['./edtiprice.component.css']
})
export class EdtipriceComponent implements OnInit {

  value = '';
  isEmpty: boolean = false;
  isCreating:boolean = false;
  constructor(private dialogRef: MatDialogRef<EdtipriceComponent>,
    @Inject(MAT_DIALOG_DATA)public data: DiamanteI,
    private diamanteSvc: DiamantesService) { 
      this.dialogRef.disableClose = true;
    }

  ngOnInit(): void {
  }

  onNoClick(data:DiamanteI){
    if(data.diamantes === '' || data.valor === 0){
      this.isEmpty = true;
    }else{
      this.isCreating = true;
      this.isEmpty = false;
      this.diamanteSvc.updatePrice(data).then(res => {
          this.isCreating = false;
          this.dialogRef.close();
      }).catch(err => {
        console.log(err);
      
      })
    }
  }
}
