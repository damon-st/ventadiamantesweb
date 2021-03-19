import { MediaMatcher } from '@angular/cdk/layout';
import { formatDate, FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileDetector } from 'selenium-webdriver';
import { DiamanteI } from 'src/app/models/diamante';
import { NotificationI,NotI } from 'src/app/models/notification';
import { TokensI } from 'src/app/models/tokens';
import { UserDataI } from 'src/app/models/users';
import { ImagesRef, VentaI } from 'src/app/models/venta';
import { AuthService } from 'src/app/services/auth.service';
import { DiamantesService } from 'src/app/services/diamantes.service';

import swal from 'sweetalert';
import { DialogaddiamanteComponent } from '../dialogaddiamante/dialogaddiamante.component';
import { DialogimageComponent } from '../dialogimage/dialogimage.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  notificationI: NotificationI = {notification: null,to: ''};
  datosUsuario: UserDataI[] = [];
  
  datosVendedor: UserDataI;
  imgRef: ImagesRef[] =[];

  isReady: boolean = false;

  valorSubidaImg: number =0;
  fecha: any = "";
  urlImage: Observable<string>;

  uidReceiver: string;
  tokenReceiver: string;

  ventaDiamante: VentaI = {
    colorValorPorVenta: '',
    colorVendedor:'',
    descripcion: '',
    descripcionDiamantes: '',
    fechaVenta: '',
    idVentaRef: '',
    image: [],
    numeroVenta: 0,
    precioDiamante: 0,
    vendedorName:'',
    vendedorUID: '',
  };

  tokens: TokensI[] = [];

  diamante: DiamanteI[] = 
  [{descripcion:'100 + BONUS 10 DIAMANTES',precio:1.30},
   {descripcion:'200 + BONUS 20 DIAMANTES',precio: 2.60},
   {descripcion:'310 + BONUS 31 DIAMANTES',precio: 3.50},
   {descripcion:'520 + BONUS 52 DIAMANTES',precio: 5.25},
   {descripcion:'620 + BONUS 62 DIAMANTES',precio: 6.75},
   {descripcion:'825 + BONUS 88 DIAMANTES',precio: 8.85},
   {descripcion:'1060 + BONUS 106 DIAMANTES',precio:11.25},
   {descripcion:'1360 + BONUS 147 DIAMANTES',precio:14.75},
   {descripcion:'1540 + BONUS 198 DIAMANTES',precio:16.50},
   {descripcion:'2180 + BONUS 218 DIAMANTES',precio:21.25},
   {descripcion:'2620 + BONUS 350 DIAMANTES',precio:26.00},
   {descripcion:'5600 + BONUS 560 DIAMANTES',precio:51.00}];


   slideConfig={"slidesToShow":4,"slidesToScroll": 4};

   mediaQueryList: MediaQueryList;

   @ViewChild('imageFiles') imageFiles: ElementRef;
   @ViewChild('idjugador') idJugador:ElementRef;
   @ViewChild('imgFile') imgFile: ElementRef;

  constructor(private auth: AuthService,
    private storage: AngularFireStorage,
    public diamanteSvc: DiamantesService,
    private dialog: MatDialog,
    private _snackBar : MatSnackBar,
    private route:Router,
    private mediaMatcher: MediaMatcher) { 
    this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 500px)');
  }

  ngOnInit(): void {
   
    if(this.mediaQueryList.matches){
      this.slideConfig={"slidesToShow":1,"slidesToScroll": 1};

    }
  

    this.route.navigateByUrl


    this.auth.requestPermission();
   
    this.getNumeroVenta();
    
    
    this.ventaDiamante.colorVendedor = "#333333";
    this.updateDate();

      this.auth.user.subscribe(user =>{
        if(user){
          this.auth.getDataUser(user.uid).snapshotChanges().subscribe(
            users=>{
              users.forEach(elem =>{
                let x = elem.payload.toJSON();
                this.datosUsuario.push(x as UserDataI);
              });
              this.datosUsuario.forEach(s =>{
                
                  if(s.uid === user.uid){

                    this.isReady = true;

                    this.datosVendedor = {uid: s.uid,email: s.email,device_token:s.device_token,name:s.name};
                 
                  }else{
                    this.uidReceiver = s.uid;
                  }
              });
              this.ventaDiamante.vendedorName = this.datosVendedor.name;
              this.ventaDiamante.vendedorUID = this.datosVendedor.uid;
              this.auth.getToken().subscribe(res =>{
                 res.forEach(elem =>{
                  let x = elem.payload.toJSON();
                  x['$key'] = elem.key;
                  this.tokens.push(x as TokensI);

                  
                 });
                 this.tokens.forEach(e =>{
                  if(e.$key === this.uidReceiver){
                    this.tokenReceiver = e.token;
                  }
                    
                });
              });              
            
              
            }
          )
        }
      });  
      
      setInterval(() =>{
          this.updateDate();
          console.log("updatedate");
          
      },60000*1);
      
  }

  getNumeroVenta(){

    const dias = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31');
    const mes = new Array('01','02','03','04','05','06','07','08','09','10','11','12');


    this.fecha += new Date().getFullYear().toString();
    const s =  mes[new Date().getMonth()];    
    this.fecha += s.toString();
    this.fecha += dias[new Date().getDate().toString()];

    const numeroVenta = Number.parseFloat(this.fecha);

    console.log(numeroVenta);

    this.ventaDiamante.numeroVenta = numeroVenta;

  }

  recuperarSelecion(diam: any){
    const {descripcion,precio} = diam;
    this.ventaDiamante.precioDiamante = precio; 
    this.ventaDiamante.descripcionDiamantes = descripcion;
    console.log(this.ventaDiamante);
  
    
  }

  isUpload:boolean = false;
  recuperarDirImages(e : any){
    const file = e.target.files;    
    if(file !==null && file.length > 0){
     
      for(let i =0; i<file.length ; i++ ){
        const files = file[i];
        const size = files.size;
              
         if(size >= 1000){
        this.valorSubidaImg = 10;
        const  id = Math.random().toString(36).substring(2);
        const filePath = `eliminar/${id}`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath,files);
    
        task.snapshotChanges()
        .pipe(finalize(() =>{
          ref.getDownloadURL().subscribe((url)=>{
            this.imgRef = this.imgRef.concat([url]);
            this.valorSubidaImg = 75;

          });
           // this.urlImage = ref.getDownloadURL();        
            setTimeout(() => {
              this.cambio();
            }, 1000);
        })).subscribe();
    
        
       }

      }
      
     
    }

   
  }


  addSlide() {
   // this.diamante.push({img: "http://placehold.it/350x150/777777"})
  const dialogRef =  this.dialog.open(DialogaddiamanteComponent,{
    data:{descripcion: '', precio: 0}
  });

  dialogRef.afterClosed().subscribe(resul => {
    if(resul) this.diamante.push(resul);
  });

  }
  
  removeSlide() {
    //this.diamante.length = this.diamante.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }


  cambio(){
    this.valorSubidaImg = 100;
    // this.imgRef.push(this.imageFiles.nativeElement.value);
    this.imgFile.nativeElement.value = '';
    this.valorSubidaImg = 0;
  }

  crearVenta(){
    //this.imgRef.push(this.imageFiles.nativeElement.value);

    if(this.ventaDiamante.descripcionDiamantes === '' || 
      this.idJugador.nativeElement.value === ''||
      this.idJugador.nativeElement.value === ' '||
      this.imgRef.length < 1){
      swal('Error','Por favor seleciona el diamante vendido', 'error');
    }else{
         console.log(this.ventaDiamante);
    this.ventaDiamante.image.push(...this.imgRef);
    this.diamanteSvc.uploadVenta(this.ventaDiamante);
    swal({
      title: "Exito",
      text: "Se a creado la venta exitosamente recargare la pagina :D",
      icon: "success",
      buttons: ['cancelar','nueva recargar'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
       //window.location.reload();
         this.sendNotification(this.ventaDiamante.descripcionDiamantes,this.ventaDiamante.precioDiamante);
         this.valorSubidaImg= 0;
         this.imgRef = [];
         this.imageFiles.nativeElement.value = '';
         this.ventaDiamante.image = [];
         this.idJugador.nativeElement.value = '';
         this.imgFile.nativeElement.value = '';
         this.updateDate();
      } else {
        swal("Recarga manualmente la pagina");
      }
    });
    }

 
    
  }


  updateDate() {
    this.ventaDiamante.fechaVenta = this.getDate().toLowerCase();
  }


  getDate(): string{
    const meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    const diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    const dias = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31');
    const  f=new Date();
    const ampm = (f.getHours() >=12) ? 'p.m.':'a.m.';
     return diasSemana[f.getDay()] + ", " + dias[f.getDate()] + " " + meses[f.getMonth()] + " " + f.getFullYear() + " " + f.getHours()+":" + f.getMinutes()+ " " + ampm;
    
  }

  body: NotI = {title: '',body: '', icon:''};
  sendNotification(des: string,price: number){
   this.body.title ='Nueva Venta';
   this.body.body = des + "= $" + price;
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
          window.open('https://api.whatsapp.com/send?phone=593984334637&text=Ahorita,%20hice%20una%20recargar%20'+'de%20' + '$%20'+ this.ventaDiamante.precioDiamante+'%20','_blank');

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

  openImage(img:string): void{
    console.log(img);
    
    this.dialog.open(DialogimageComponent,{
      data:{img}
    });
  }

  deleteImage(img: string, index: any): void{
    this.diamanteSvc.deleteImageDB(img).subscribe(res => {
      this.imgRef.splice(index,1);
    },
    err => {
      swal('Error', `Algo sali mal al eliminar la imagen${err}`, 'error');
    });
  }
}
