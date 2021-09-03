import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Img, ITable, PdfMakeWrapper, QR, Table, Txt } from 'pdfmake-wrapper';
import { Agrupado, ImagesRef, Llaves, VentaI } from 'src/app/models/venta';
import { DiamantesService } from 'src/app/services/diamantes.service';
import swal from 'sweetalert';
import { AddRespuestaComponent } from '../add-respuesta/add-respuesta.component';
import { DialogimageComponent } from '../dialogimage/dialogimage.component';
import { VentaImagenesComponent } from '../venta-imagenes/venta-imagenes.component';
@Component({
  selector: 'app-inicio-diamantes',
  templateUrl: './inicio-diamantes.component.html',
  styleUrls: ['./inicio-diamantes.component.css']
})
export class InicioDiamantesComponent implements OnInit, AfterViewInit {

  ventas:VentaI[] = [];
  ventasSearch: VentaI[] = [];

  numerodeVentas: number = 0;
  totalVentas:number =0;
  totalVentasTexto:string = '';

  cols: number ;  
  searchText:string = '';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  mediaQueryList: MediaQueryList;

  final: any;

  agrupado: Agrupado[] = [];
  agrupadoSearch: Agrupado[] = [];
  
  llaves: any [] = [];

  objetoFinal = {fecha: null, venta: []};

  slideIndex: number = 1;

  images:any = [];
  
  @ViewChild('btnscrolltop') btnscrolltop : ElementRef;
  @ViewChild('btnscrollbottom') btnscrollbottom : ElementRef;

  constructor(private diamanteSVC: DiamantesService, 
    private matDialog: MatDialog,
    private matches: MediaMatcher,
    private _snackBar:MatSnackBar,
    private route: Router
   ) {
      this.mediaQueryList =matches.matchMedia('(max-width: 500px)');
      this.cols = 3;
     }
  ngAfterViewInit(): void {
    window.onscroll = ()=>{
      this.scrollFunction();
    }

    
  }

  ngOnInit(): void {

    console.log(this.mediaQueryList.matches);
    
    if(this.mediaQueryList.matches === true){
      this.cols =1;
    }

    this.diamanteSVC.getAllVentas().subscribe(res => {
   
      this.ventas = [];
      this.ventasSearch = [];
      res.forEach(venta =>{
        this.ventas.push(venta as VentaI);
      });
      this.ventasSearch = this.ventas;
      this.comparacionPagado();
      this.getValorVentas();

      // this.getFechasQuery(this.ventas);

      this.agruparVentas();
      this.agrupadoSearch = this.agrupado;


      // console.log(this.agrupado);

    },error =>{
      console.log(error);
      swal('Error', error,'error');
    })



    
  }


  agruparVentas():void{
    this.final = this.ventas.reduce(function(p: VentaI,c: VentaI){
      p[c.numeroVenta] = p[c.numeroVenta] || [];
      p[c.numeroVenta].push(c);
      return p;
    },{});

    this.final=  Object.entries(this.final);
    // Object.keys(this.final).map(function(key){
    //   arr.push(this.fin);
    //   return arr;
    // });

    let valor = new Map(this.final);

    let llave = Array.from(valor.keys());

    // console.log(llave);
    
  
    for(var i =0; i < llave.length; i++){
      
      this.objetoFinal.fecha = llave[i];
      
      this.objetoFinal.venta.push(valor.get(llave[i]) as VentaI);
      
      this.agrupado[i] = { fecha: this.objetoFinal.fecha, venta: this.objetoFinal.venta[0]};
      this.objetoFinal.fecha = "";
      this.objetoFinal.venta = [];
    }

  }


  comparacionPagado():void{
    var posicion =-1;
    for(var i =0; i < this.ventas.length; i++){
     
      if( this.ventas[i].colorValorPorVenta.includes('hasta',0)){
        posicion = i;
        
      }
    }

    

    for(var i = posicion; i>= 0; i-- ){
      this.ventas[i].cancel = true;
    }

  }

  getValorVentas(): void{
    this.numerodeVentas  = 0;
    this.totalVentas =0;
    this.numerodeVentas = this.ventas.length;
    this.ventas.forEach(venta =>{
      if(!venta.cancel){
        this.totalVentas +=venta.precioDiamante;
      }
    });
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
           this.agrupado = [];
           resultado.forEach(v =>{
             this.ventas.push(v as VentaI);
           })

           this.agruparVentas();
           this.getValorVentas();
         
       
    }else{
      this.ventas = [];
      this.ventas = this.ventasSearch;
      this.agrupado = [];
      this.agrupado = this.agrupadoSearch;
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

   console.log(start);
   

   if((inicio !== 0 || final !==0) && start !== null){
    let resultado= this.ventas.filter((v:VentaI)=>{
       if(v.numeroVenta >= inicio && v.numeroVenta <= final){
          return v;
       }
     });
     if(resultado.length !==0){
       this.ventas = [];
       this.agrupado = [];
       
     
     resultado.forEach(v =>{
       this.ventas.push(v as VentaI);
     });

     this.agruparVentas();

     this.getValorVentas();
     }
    
   }else{
     this.ventas =[];
     this.ventas = this.ventasSearch;
     this.agrupado = [];
     this.agrupado = this.agrupadoSearch;
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
    // this.matDialog.open(VentaImagenesComponent,{
    //   data: venta.image
    // })
    this.images = [];
    this.images.push(venta.image);
    this.openModal();
  }

  addRespuesta(venta:VentaI){
    this.matDialog.open(AddRespuestaComponent,{
      data:venta
    })
  }

  quitarRespuesta(venta:VentaI){
    this.diamanteSVC.addRespuestaVenta(venta,'').then((res)=>{
      this._snackBar.open('Exito al quitar la anotacion','ok',{
        duration: 3000
      })
    }).catch(error =>{
      console.log(error);
      this._snackBar.open(`Ocurrio un error al quitar la anotacion erro = ${error}`,'ok',{
        duration: 3000
      })
    })
  }

  deleteVenta(venta:VentaI){

   this.diamanteSVC.deleteVenta(venta).then((res)=>{
    venta.image.forEach(v=>{
      this.diamanteSVC.deleteImageDB(v);
       
      });    
    this._snackBar.open(`Eliminado Correcto de la venta`,'ok',{
      duration: 3000
    })
   }).catch(error =>{
     this._snackBar.open(`Ocurrio un error al eliminar la venta = ${error}`,'ok',{
       duration: 3000
     })
   })
  }

  async factura(venta:VentaI){

    this._snackBar.open('Descargando PDF por favor espere...','ok',{
      duration: 2000
    })

    const pdf = new PdfMakeWrapper();
    const numeroR =  Math.floor(Math.random()*1000);
    pdf.header(new Txt(`Factura N° ${numeroR}`).fontSize(15).end);

    pdf.add(
      
      await new Img('https://i.postimg.cc/qBnXV365/frefire.png').alignment('right').build()
      
    );

    //https://i.postimg.cc/fWB1qcTx/Whats-App-Image-2021-06-09-at-14-12-33.jpg
    pdf.add(await new Img('https://i.postimg.cc/WzkPS79j/telejas.png').build());
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt('CABINAS TELEFONICAS Y CYBER TELEJAS').fontSize(18).alignment('center').bold().end
    )
    pdf.add(pdf.ln(2));
    //pdf.add('Direccion: Nueva Aurora, calle Fenicio Angulo OE1J');
    //pdf.add('Telefono: (593) 0967031084 / (593) 0995901335');
    pdf.add(
      new Txt('Comprobante de recarga electronica del juego FreeFire').bold().end
    );
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt(`ID del Jugador: ${venta.descripcion}`).end
    );
    pdf.add(
      new Txt(`Fecha de venta realizada: ${venta.fechaVenta}`).end
    );
    pdf.add(pdf.ln(2));
    pdf.add(this.crearTablaFacutra(venta));
    pdf.add(pdf.ln(1));
    // pdf.add(
    //   new QR(`
    //       Telejas\n
    //       Venta de Diamantes de FreeFire\n
    //       ID JUGADOR = ${venta.descripcion}\n
    //       Fecha de venta = ${venta.fechaVenta}\n
    //       Valor Total = ${venta.precioDiamante}\n
    //       ID VENTA = ${venta.idVentaRef}
    //   `).fit(150).alignment('center').end
    // );
   

    pdf.add(
      new QR(`
      https://ventadiamantes-329aa.firebaseapp.com/factura/${venta.idVentaRef}
      `).fit(150).alignment('center').end
    );

    pdf.footer(`Nota: Este comprabante no es valido para reclamos o en ciertas entidades gracias por preferirnos.`);



     pdf.create().download(`ID ${venta.descripcion}`);

    
  }

  crearTablaFacutra(venta:VentaI): ITable{
    // const iva = venta.precioDiamante * 0.12;
    // const subtotal =  venta.precioDiamante - iva;
      return new Table([
        ['Cantidad',new Txt('Descripción').bold().alignment('center').end,'V.Unitario' ,'V.Total'],
        [1, `Recarga online del Juego FreeFire diamantes ${venta.descripcionDiamantes} \n\n\n\n`,'',venta.precioDiamante],
        ['','',new Txt('SUBTOTAL').bold().alignment('right').end,venta.precioDiamante],
        ['','',new Txt('IVA 12%').bold().alignment('right').end, 0],
        ['','',new Txt('TOTAL').bold().alignment('right').end, venta.precioDiamante]
      ]).end;
  }


  scrollFunction():void{
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop >40){
      this.btnscrolltop.nativeElement.style.display = 'block';
    }else{
      this.btnscrolltop.nativeElement.style.display = 'none';

    }

    
    
  }

  scrollTop():void{
    window.scrollTo({top: 0,behavior: 'smooth'});
  }

  scrollBottom():void{
    window.scrollTo(0,document.body.scrollHeight||document.documentElement.scrollHeight);
  }

  

  getFechasQuery(venta:VentaI[]):void{
    let coleccion = new Map();
    // venta.map((ventaOne,i)=>{
    //   if(ventaOne.numeroVenta === ventaOne.numeroVenta){
    //     coleccion.set(ventaOne.numeroVenta,ventaOne);
    //   }
    // })

    venta.forEach(v =>{
      coleccion.set(v.numeroVenta,v);
    })
    
    for(let [key,values] of coleccion){
      console.log( key + ' = ' + values);
      
    }
  }


  editVenta(venta:VentaI):void{
    this.diamanteSVC.venta = venta;
    this.route.navigate(['/edit']);
  }


   openModal():void {
    document.getElementById("myModal").style.display = "block";
    this.currentSlide(1);
  }
  
   closeModal():void {
    document.getElementById("myModal").style.display = "none";
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  
   currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }
  
   showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;    
    var dots = document.getElementsByClassName("demo") as HTMLCollectionOf<HTMLElement>;  
    var captionText = document.getElementById("caption");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        // slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";
    dots[this.slideIndex-1].className += " active";
    // captionText.innerHTML = dots[this.slideIndex-1];
  }
}
