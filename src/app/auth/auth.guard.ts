import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      let authenticated = this.authService.isAuthenticated();
      if (!authenticated) {
        this.router.navigate(['login']);
        return false;
      }

      const requiredRoles = route.data['roles'] as string[] || [];
      if (requiredRoles.length && !this.authService.hasAnyRole(requiredRoles)) {
        this.router.navigate(['home']);
        return false;
      }

      return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.canActivate(childRoute, state);
  }
  
}
