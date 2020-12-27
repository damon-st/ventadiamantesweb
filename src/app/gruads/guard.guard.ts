import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> |Promise<boolean | UrlTree> | boolean |UrlTree {
    return this.auth.user.pipe(take(1))
     .pipe(map(authState => !! authState))
     .pipe(tap(auth=>{
       if(!auth){
         this.router.navigate(['/login']);
       }
     }))
      
    
  }
  
}
