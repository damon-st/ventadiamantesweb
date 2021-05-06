import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-venta-imagenes',
  templateUrl: './venta-imagenes.component.html',
  styleUrls: ['./venta-imagenes.component.css']
})
export class VentaImagenesComponent implements OnInit {
 
  slideConfig={"slidesToShow":1,"slidesToScroll":1};

  constructor(private matDialogRef: MatDialogRef<VentaImagenesComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any) { 
      this.matDialogRef.disableClose = true;
    }

  ngOnInit(): void {

  }

  closeDialog(){
    this.matDialogRef.close();
  }

}
