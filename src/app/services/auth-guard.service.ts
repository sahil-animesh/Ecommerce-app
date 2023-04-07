import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PATH } from 'src/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    
    const token=localStorage.getItem('token')
    if(token) {
      return true;
    }
    else {
      this.router.navigate([PATH.AUTH.AUTH])
      return false;
    }

  }
  
}
