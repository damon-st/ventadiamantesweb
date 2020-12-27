import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  public  isLogin() {
    return this.auth.onAuthStateChanged((user)=>{
        if(user){
          return true;
        }else{
          return false;
        }
    });
  }

  public isAuth(){
    return this.auth.authState.pipe(map(auth => auth));
  }


}
