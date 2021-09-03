import { AfterViewChecked, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import { GalleryI } from 'src/app/models/diamante';

@Component({
  selector: 'app-venta-imagenes',
  templateUrl: './venta-imagenes.component.html',
  styleUrls: ['./venta-imagenes.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VentaImagenesComponent implements OnInit,AfterViewChecked {
 
  slideConfig={"slidesToShow":1,"slidesToScroll":1};

  settings = {
    counter: false,
    plugins: [lgZoom]
  };
  private lightGallery!: LightGallery;
  private needRefresh = false;

  items: GalleryI[] = [];
  item: GalleryI = {id:'',src:'',thumb:'',size:''};

  constructor(private matDialogRef: MatDialogRef<VentaImagenesComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any) { 
      this.matDialogRef.disableClose = true;
    }
  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    } 
   }

  

  ngOnInit(): void {
      console.log(this.datos);
      for(var i =0; i < this.datos.length ; i++){
        this.item = { 
          id: ''+i,
          src:this.datos[i],
          thumb:this.datos[i],
          size:'1400-933'
        };
        this.items[i] = this.item;
      }
  }

  onInit = (detail): void => {
    this.lightGallery = detail.instance;
  };

  closeDialog(){
    this.matDialogRef.close();
  }

}
