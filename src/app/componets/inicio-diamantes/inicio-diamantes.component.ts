import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VentaI } from 'src/app/models/venta';
import { DiamantesService } from 'src/app/services/diamantes.service';
import swal from 'sweetalert';
import { DialogimageComponent } from '../dialogimage/dialogimage.component';
@Component({
  selector: 'app-inicio-diamantes',
  templateUrl: './inicio-diamantes.component.html',
  styleUrls: ['./inicio-diamantes.component.css']
})
export class InicioDiamantesComponent implements OnInit {

  ventas:VentaI[] = [];
  ventasSearch: VentaI[] = [];

  numerodeVentas: number = 0;
  totalVentas:number =0;
  totalVentasTexto:string = '';

    
  searchText:string = '';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(private diamanteSVC: DiamantesService, 
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.diamanteSVC.getAllVentas().subscribe(res => {
   
      this.ventas = [];
      this.ventasSearch = [];
      res.forEach(venta =>{
        this.ventas.push(venta as VentaI);
      });
      this.ventasSearch = this.ventas;
      this.getValorVentas();
    },error =>{
      console.log(error);
      swal('Error', error,'error');
    })
  }

  getValorVentas(){
    this.numerodeVentas  = 0;
    this.totalVentas =0;
    this.numerodeVentas = this.ventas.length;
    this.ventas.forEach(venta =>{
      this.totalVentas +=venta.precioDiamante;
    })
    this.totalVentasTexto = this.totalVentas.toFixed(2);
  }

  searchVenta(datos:string){
    if(datos.length > 1){
     
        let resultado = this.ventas.filter((e:VentaI)=>{
           if(e.descripcion.trim().toLowerCase().includes(datos.trim().toLowerCase())){
             return e;
           }
         });       
      
           this.ventas= [];
           resultado.forEach(v =>{
             this.ventas.push(v as VentaI);
           })
         
       
    }else{
      this.ventas = this.ventasSearch;
      this.getValorVentas();
    }
 
    
  }

  searchVentaForDays(datos:any){
   this.ventas =[];
   this.ventas = this.ventasSearch;
   const {start, end} = datos;
   const fechaInicio = new Date(start);
   const fechaFinal = new Date(end);
   
   const inicio = this.getFechaNumber(fechaInicio);
   const final = this.getFechaNumber(fechaFinal);

   if(inicio !== 0 || final !==0){
    let resultado= this.ventas.filter((v:VentaI)=>{
       if(v.numeroVenta >= inicio && v.numeroVenta <= final){
          return v;
       }
     });
     if(resultado.length !==0){
       this.ventas = [];
     
     resultado.forEach(v =>{
       this.ventas.push(v as VentaI);
     })

     this.getValorVentas();
     }
    
   }else{
     this.ventas =[];
     this.ventas = this.ventasSearch;
     this.getValorVentas();
   }
  }

  numero: any ='';
  getFechaNumber(fecha: any): number{
    this.numero = '';
    const dias = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31');
    const mes = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
    this.numero += new Date(fecha).getFullYear().toString();
    const s =  mes[new Date(fecha).getMonth()];    
    this.numero += s.toString();
    this.numero += dias[new Date(fecha).getDate().toString()];

    return Number.parseFloat(this.numero);
  }

  openImages(venta: VentaI){
    console.log(venta);
    this.matDialog.open(DialogimageComponent,{
      data: venta.image
    })
  }
}
