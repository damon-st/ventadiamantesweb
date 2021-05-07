import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { min } from 'rxjs/operators';
import { NotI, NotificationI } from 'src/app/models/notification';
import { TokensI } from 'src/app/models/tokens';
import { VentaI } from 'src/app/models/venta';
import { AuthService } from 'src/app/services/auth.service';
import { DiamantesService } from 'src/app/services/diamantes.service';

@Component({
  selector: 'app-add-respuesta',
  templateUrl: './add-respuesta.component.html',
  styleUrls: ['./add-respuesta.component.css']
})
export class AddRespuestaComponent implements OnInit {

  error:any;

  formulario:any;
  body: NotI = {title: '',body: '', icon:''};
  notificationI: NotificationI = {notification: null,to: ''};
  tokenReceiver: string;
  tokens: TokensI[] = [];

  constructor(private matDialog:MatDialogRef<AddRespuestaComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:VentaI,
    private diamanteSvc: DiamantesService,
    private auth:AuthService,    
    private _snackBar : MatSnackBar,
    ) { 
      this.matDialog.disableClose =true;
    }

  ngOnInit(): void {
    this.formulario = new FormGroup({colorValorPorVenta:new FormControl(this.datos.colorValorPorVenta,[Validators.required])});
    this.auth.getToken().subscribe(res =>{
      res.forEach(elem =>{
       let x = elem.payload.toJSON();
       x['$key'] = elem.key;
       this.tokens.push(x as TokensI);

       
      });
      this.tokens.forEach(e =>{
       if(e.$key === this.datos.vendedorUID){
         this.tokenReceiver = e.token;
       }
         
     });
   });
  }

  closeDialog():void{
    this.matDialog.close();
  }
  

  addRespuesta(respuesta:any):void{
    this.diamanteSvc.addRespuestaVenta(this.datos,respuesta.colorValorPorVenta).then((res)=>{
      this.matDialog.close();
      this.sendNotification(respuesta.colorValorPorVenta);
    }).catch(error =>{
      console.log(error);
      this.error = error;
    })
  }


 

  sendNotification(des: string){
   this.body.title ='Respuesta a la venta';
   this.body.body = des;
   this.body.icon ="default";
   this.notificationI.notification =this.body;
   //this.notificationI.to ="dIcqYGyfQ6-9rZB-pNONNB:APA91bFhRBbJGCEn_yVzKrE-A7Do1kdujVznClhhYdgR9DAMQ3Fa7VfUPagGOWqCc0lPE5L1GGLSscSMKeieiPYqCVj8QmNW5haRIF1xdF7o-q44plcBO2GS4ZCF5-S5-xh9bk1IqtW4";
   this.notificationI.to = this.tokenReceiver; 
   this.diamanteSvc.sendNotification(this.notificationI).subscribe(
      res => {
        if(res.success){
          this._snackBar.open("Exito al enviar notificacion","ok",{
            duration: 3000
          });
        }else{
          this._snackBar.open("Error al enviar la notificacion :(","ok",{
            duration: 3000
          });
        }
        
      },
      err =>{
        console.log("error "+err);
        
      }
    )
  }

}
