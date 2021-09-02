import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbars',
  templateUrl: './toolbars.component.html',
  styleUrls: ['./toolbars.component.css']
})
export class ToolbarsComponent implements OnInit, AfterViewInit {


  isLogin;

  uid:any = '';

  constructor(public auth: AuthService,
              private router: Router) { 
  
  }

  ngOnInit(): void {
    this.auth.user.subscribe(res => {
      if(res){
        this.uid = res.uid;
        this.closeClick();
      }
      
    },err =>{
      console.log(err);
      
    })
  }

  ngAfterViewInit():void{
   
  }


  logout(){
    this.auth.logout().then(user => {
      this.uid = '';
      this.router.navigate(['/login']);
    }).catch(err =>{console.log(err);}
    );

    document.getElementById('menu-sidebar').classList.remove('menu-sidebar-show');
  }

  openMenu():void{
    let menu = document.getElementById('menu-sidebar');
    menu.classList.toggle('menu-sidebar-show');
  }


  closeClick():void{
    

  
    setTimeout(() => {
      let navLink = document.querySelectorAll('.hola');
      let input = <HTMLInputElement> document.getElementById('menu-icon');
  
      navLink.forEach(n => n.addEventListener('click',function(){
            input.checked = ! input.checked;
            console.log(input.checked);
            
      }));
    }, 1000);
 
  }

}
