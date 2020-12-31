import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, mergeMapTo } from 'rxjs/operators';
import {  BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currentMessage = new BehaviorSubject(null); 


  isLoadin:boolean = false;
  public user: Observable<firebase.User>;
  constructor(private auth: AngularFireAuth,
      private database: AngularFireDatabase,
      private afMessaging: AngularFireMessaging) { 
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


  public getDataUser(userid: any){
    return this.database.list('Users');
  }

  public requestPermission(){
    this.afMessaging.requestPermission
    .pipe(mergeMapTo(this.afMessaging.tokenChanges))
    .subscribe(token =>{
      console.log("success");
      
    },err => {console.log(err);
    });
  }

  public resiveMessage(){
    this.afMessaging.onMessage((payload)=>{
      console.log("Message received", payload);
      this.currentMessage.next(payload);
    });

    
  }

  public getToken(){
    return this.database.list('Tokens').snapshotChanges();
  }
}
