import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide:boolean = true;

  control= new FormGroup({email:new FormControl('',[Validators.required,Validators.email]),
            password: new FormControl('',[Validators.required,Validators.minLength(6)])})

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    
    this.auth.user.subscribe(user=>{
        if(!user){
          this.router.navigate(['/login']);
        }else{
          this.router.navigate(['/home']);
        }
    });
    
  }

  getErrorMessage(): string{

    if(this.control.controls.email.hasError('required')){
      return 'Tienes que llenar este campo'
    }

    return this.control.controls.email.hasError('email') ? 'No es un correo valido' :'';
  }


  login(datos: FormGroup): void{
      this.auth.Login(datos).then((user)=>{
        this.router.navigate(['/home']);
        
      }).catch(err=>{console.log(err)});
  }

}
