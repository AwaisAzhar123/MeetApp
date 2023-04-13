import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login()
  {
     this.authService.login(this.model).subscribe( next => {
      this.alertify.success('Logged in successfully'); },
      error =>{
       this.alertify.error(error);
      });
     }

  loggedIn()
  {
     return this.authService.loggedIn();
  }

  loggedOut()
  {
      localStorage.removeItem('token');
      this.alertify.message('Logged out successfully');
  }
  }


