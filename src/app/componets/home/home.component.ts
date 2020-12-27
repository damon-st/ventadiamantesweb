import { Component, OnInit } from '@angular/core';
import { DiamanteI } from 'src/app/models/diamante';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
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

  constructor() { 
    
  }

  ngOnInit(): void {
      
  }

  recuperarSelecion(diam: DiamanteI){
    console.log(diam);
    
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

}
