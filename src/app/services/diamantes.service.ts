import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { VentaI } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class DiamantesService {

  constructor(private dtf : AngularFireDatabase) { }


  public async uploadVenta(venta: VentaI){
   const ref = await this.dtf.list('Venta').push(venta).key;
   
   this.dtf.list('Venta').update(ref,{
    idVentaRef: ref
   });
  }

}
