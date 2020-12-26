import { Component, OnInit } from '@angular/core';
import { DiamanteI } from 'src/app/models/diamante';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  diamantes: DiamanteI[];

  constructor() { }

  ngOnInit(): void {
  }

}
