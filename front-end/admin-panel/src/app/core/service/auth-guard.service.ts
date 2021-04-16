import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) { }

  canActivate(): boolean {
    // if user is logged then return retun true 
    // debugger;
    if (this.jwtService.getToken()) {
      return true;
    }
    else {
      // otherwise 
    // navigate to the login
    // return false
    // debugger;
    this.router.navigate(['/login']);
    this.router.navigate(['/signup']);
    return false;
      
    }
    
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

}
