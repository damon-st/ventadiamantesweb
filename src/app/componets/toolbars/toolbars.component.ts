import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbars',
  templateUrl: './toolbars.component.html',
  styleUrls: ['./toolbars.component.css']
})
export class ToolbarsComponent implements OnInit {


  isLogin;

  constructor(public auth: AuthService,
              private router: Router) { 
  
  }

  ngOnInit(): void {
    
  }


  logout(){
    this.auth.logout().then(user => {
      this.router.navigate(['/login']);
    }).catch(err =>{console.log(err);}
    );
  }

}
