import { Component, OnInit } from '@angular/core';
import { VentaI } from 'src/app/models/venta';
import { DiamantesService } from 'src/app/services/diamantes.service';
import swal from 'sweetalert';
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


  constructor(private diamanteSVC: DiamantesService) { }

  ngOnInit(): void {
    this.diamanteSVC.getAllVentas().subscribe(res => {
      this.numerodeVentas  = 0;
      this.totalVentas =0;
      this.ventas = [];
      this.ventasSearch = [];
      res.forEach(venta =>{
        this.ventas.push(venta as VentaI);
      });
      this.ventasSearch = this.ventas;
      this.numerodeVentas = this.ventas.length;
      this.ventas.forEach(venta =>{
        this.totalVentas +=venta.precioDiamante;
      })
      this.totalVentasTexto = this.totalVentas.toFixed(2);
    },error =>{
      console.log(error);
      swal('Error', error,'error');
    })
  }


  searchVenta(datos:string){
    if(datos.length > 1){
      if(this.ventas.length>1){
        let resultado = this.ventas.filter((e:VentaI)=>{
           if(e.descripcion.trim().toLowerCase().includes(datos.toLowerCase().trim())){
             return e;
           }
         });
         
         if(resultado.length>=1){
           this.ventas= [];
           resultado.forEach(v =>{
             this.ventas.push(v as VentaI);
           })
         }
       }
    }else{
      this.ventas = this.ventasSearch;
    }
 
    
  }
}
