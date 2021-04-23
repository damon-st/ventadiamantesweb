import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiamanteI } from 'src/app/models/diamante';
import { DiamantesService } from 'src/app/services/diamantes.service';

@Component({
  selector: 'app-dialogaddiamante',
  templateUrl: './dialogaddiamante.component.html',
  styleUrls: ['./dialogaddiamante.component.css']
})
export class DialogaddiamanteComponent implements OnInit {

  value = '';
  isEmpty: boolean = false;
  isCreating:boolean = false;
  constructor(private matDialogRef: MatDialogRef<DialogaddiamanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiamanteI,
    private diamanteSvc: DiamantesService) {
      matDialogRef.disableClose = true;
     }

  ngOnInit(): void {
  }



  onNoClick(data: DiamanteI): void{
    if(data.diamantes === '' || data.valor === 0){
      this.isEmpty = true;
    }else{
      this.isCreating = true;
      this.isEmpty = false;
      // this.matDialogRef.close(data);
      this.diamanteSvc.crearPrecio(data).then(
        res =>{
          this.isCreating = false;
          this.matDialogRef.close();
        }
      ).catch(err =>{
        console.log(err);
      })
    }
  }
}
