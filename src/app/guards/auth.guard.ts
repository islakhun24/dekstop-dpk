import { TokenStorageService } from '../services/token-storage.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
    private tokenService: TokenStorageService
    ){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.tokenService.getUser();

      if (currentUser) {

          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return true
    }

}
