import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { VentaI } from '../models/venta';

import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Url } from '../models/url';
import { Observable } from 'rxjs';
import { NotificationI } from '../models/notification';
import { AngularFireStorage } from '@angular/fire/storage';
import { DiamanteI } from '../models/diamante';


@Injectable({
  providedIn: 'root'
})
export class DiamantesService {

  url:string;
  public venta: VentaI = {};
  constructor(private dtf : AngularFireDatabase,
    private http: HttpClient,
    private storage: AngularFireStorage,
   
    ) { 
      this.url = Url.url;
    }


  public async uploadVenta(venta: VentaI){
   const ref = await this.dtf.list('Venta').push(venta).key;
   
   this.dtf.list('Venta').update(ref,{
    idVentaRef: ref
   });
  }


   

  public sendNotification(not: NotificationI): Observable<any>{
   const  sensd = {
      "notification": {
      "title": "Venta Diamante", 
      "body": "Se a creado una venta de diamante",
      "icon":"R.mipmap.ic_launcher"
      },
      "to" : "dIcqYGyfQ6-9rZB-pNONNB:APA91bFhRBbJGCEn_yVzKrE-A7Do1kdujVznClhhYdgR9DAMQ3Fa7VfUPagGOWqCc0lPE5L1GGLSscSMKeieiPYqCVj8QmNW5haRIF1xdF7o-q44plcBO2GS4ZCF5-S5-xh9bk1IqtW4"
     }    
    const headers = new HttpHeaders({Authorization:'key=AAAAKK3kBc8:APA91bHJZwumNqCMn_sUj4jZFujYXte3JvTLOaAj-YCFf53zlpOiZURlOPJAFKkNxyJY8MLv_AxcAu0W4jsElSHfwLs2obwx6RDZsp_8J6ty2I_sVNXRPMl4S9GLtkN6G6jzIlgSKaBs','Content-Type':'application/json'});
//    headers.set('Authorization','key=AAAAKK3kBc8:APA91bHJZwumNqCMn_sUj4jZFujYXte3JvTLOaAj-YCFf53zlpOiZURlOPJAFKkNxyJY8MLv_AxcAu0W4jsElSHfwLs2obwx6RDZsp_8J6ty2I_sVNXRPMl4S9GLtkN6G6jzIlgSKaBs');
    
    //headers.append('Content-Type','application/json');

    const body = JSON.stringify(not);
   // console.log(body);
    

   return this.http.post(this.url,body,{headers: headers});


  }

  public deleteImageDB(url: string){
   return this.storage.refFromURL(url).delete();
  }

  public delteImage(path: any): void{
    this.storage.refFromURL(path).delete().subscribe(res => {
      console.log('exito');
      
    },error => console.log(error)
    )
  }

  public getPrices(){
    return this.dtf.list('Precios').valueChanges();
  }

  public async crearPrecio(price: DiamanteI){
    const key = await this.dtf.list('Precios').push(price).key;
   
   return this.dtf.list('Precios').update(key, {
      id: key
    });
  }

  public updatePrice(price: DiamanteI){
    return this.dtf.list('Precios').update(price.id,price);
  }

  public deletePrice(price: DiamanteI){
    return this.dtf.list('Precios').remove(price.id);
  }


  public getAllVentas(){
    return this.dtf.list('Venta',query => query.orderByKey()).valueChanges();
  }

  public addRespuestaVenta(venta:VentaI,respuesta:any){
    return this.dtf.list('Venta').update(venta.idVentaRef,{
       colorValorPorVenta: respuesta
    });
  }

  public deleteVenta(venta:VentaI){
    return this.dtf.list('Venta').remove(venta.idVentaRef);
  }

  public updateVenta(venta:VentaI){
    return this.dtf.list('Venta').update(venta.idVentaRef,venta);
  
  }
}
