import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbars',
  templateUrl: './toolbars.component.html',
  styleUrls: ['./toolbars.component.css']
})
export class ToolbarsComponent implements OnInit {


  isLogin;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

    this.isLogin = this.auth.isLogin();
    console.log(this.isLogin);
    
  }

}
