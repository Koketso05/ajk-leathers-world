import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(): boolean {
    if (this.authService.user) {
      return true;
    } else {
     // this.router.navigate(['/']);
      return true; // TODO: Implement this correctly
    }
  }
}
