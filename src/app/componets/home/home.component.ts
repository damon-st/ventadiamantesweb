import { formatDate, FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DiamanteI } from 'src/app/models/diamante';
import { UserDataI } from 'src/app/models/users';
import { ImagesRef, VentaI } from 'src/app/models/venta';
import { AuthService } from 'src/app/services/auth.service';
import { DiamantesService } from 'src/app/services/diamantes.service';

import swal from 'sweetalert';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  datosUsuario: UserDataI[] = [];
  
  datosVendedor: UserDataI;
  imgRef: ImagesRef[] =[];

  isReady: boolean = false;

  valorSubidaImg: number =0;
  fecha: any = "";
  urlImage: Observable<string>;

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


  diamante: DiamanteI = 
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


   @ViewChild('imageFiles') imageFiles: ElementRef;

  constructor(private auth: AuthService,
    private storage: AngularFireStorage,
    private diamanteSvc: DiamantesService) { 
    
  }

  ngOnInit(): void {
   
    const d = new Date().setDate(10);
    console.log(d);
    
    this.fecha += new Date().getFullYear().toString();
    const s = new Date().getMonth() +1;    
    this.fecha += s.toString();
    this.fecha += new Date().getDate().toString();

    const numeroVenta = Number.parseFloat(this.fecha);
    this.ventaDiamante.numeroVenta = numeroVenta;
    this.ventaDiamante.colorVendedor = "#333333";
    this.ventaDiamante.fechaVenta = new Date('2018/01/30 23:30:14').toString();

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
                 
                  }
              });
              this.ventaDiamante.vendedorName = this.datosVendedor.name;
              this.ventaDiamante.vendedorUID = this.datosVendedor.uid;
            }
          )
        }
      });            
  }

  recuperarSelecion(diam: any){
    const {descripcion,precio} = diam;
    this.ventaDiamante.precioDiamante = precio; 
    this.ventaDiamante.descripcionDiamantes = descripcion;
    console.log(this.ventaDiamante);
    
  }


  recuperarDirImages(e : any){
    this.valorSubidaImg = 10;
    const file = e.target.files[0];
    const  id = Math.random().toString(36).substring(2);
    const filePath = `eliminar/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);

    task.snapshotChanges()
    .pipe(finalize(() =>{
        this.urlImage = ref.getDownloadURL();        
        this.valorSubidaImg = 75;
        
    })).subscribe();

    setTimeout(() => {
      this.cambio();
    }, 2000);
  }


  addSlide() {
   // this.diamante.push({img: "http://placehold.it/350x150/777777"})
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
    this.imgRef.push(this.imageFiles.nativeElement.value);
  }

  crearVenta(){
    //this.imgRef.push(this.imageFiles.nativeElement.value);
    console.log(this.ventaDiamante);
    this.ventaDiamante.image.push(...this.imgRef);
    this.diamanteSvc.uploadVenta(this.ventaDiamante);
    swal({
      title: "Exito",
      text: "Se a creado la venta exitosamente recargare la pagina :D",
      icon: "success",
      buttons: ['cancelar','recargar'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        window.location.reload();
      } else {
        swal("Recarga manualmente la pagina");
      }
    });
    
  }
}
