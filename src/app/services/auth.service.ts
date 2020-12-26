import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }


  public Login(usuario: any){
    const {email, pasword} = usuario;
    return this.auth.signInWithEmailAndPassword(email,pasword).then((user) =>{
      if(user){
         
      }
    }).catch(err=>{});
  }


  public logout(){
    this.auth.signOut();
  }

  public isLogin(){
    this.auth.authState.subscribe(user =>{
      if(user){
        return true;
      }else{
        return false;
      }
    });
  }
}
