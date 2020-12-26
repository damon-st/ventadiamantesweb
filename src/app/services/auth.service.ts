import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoadin:boolean = false;
  public user: Observable<firebase.User>;
  constructor(private auth: AngularFireAuth) { 
    this.user = this.auth.authState;
  }


  public Login(usuario: any){
    const {email, password} = usuario;
   return this.auth.signInWithEmailAndPassword(email,password);
  }


  public logout(){
   return this.auth.signOut();
  }
  public  isLogin(): boolean {
    
     
     console.log("dsad"+this.isLoadin);

     return this.isLoadin;
  }
}
