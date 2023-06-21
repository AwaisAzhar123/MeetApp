import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor( private authService: AuthService, private router: Router, private alertify: AlertifyService){}
  canActivate(): boolean{
    if(this.authService.loggedIn())
    {
      return true;
    }
    this.alertify.error('Authentication Required');
    this.router.navigate(['/home']);
    return false;
  }
  
}
