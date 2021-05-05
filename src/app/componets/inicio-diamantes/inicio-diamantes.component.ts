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

  numerodeVentas: number = 0;
  totalVentas:number =0;
  totalVentasTexto:string = '';

  constructor(private diamanteSVC: DiamantesService) { }

  ngOnInit(): void {
    this.diamanteSVC.getAllVentas().subscribe(res => {
      this.numerodeVentas  = 0;
      this.totalVentas =0;
      this.ventas = [];
      res.forEach(venta =>{
        this.ventas.push(venta as VentaI);
      });
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

}
