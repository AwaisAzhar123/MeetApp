import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login()
  {
     this.authService.login(this.model).subscribe( next => {
      console.log('Logged in successfully'); },
      error =>{
       console.log('Login Failed');
      });
     }

  loggedIn()
  {
     const token = localStorage.getItem('token');
     return !!token;
  }

  loggedOut()
  {
      localStorage.removeItem('token');
      console.log('Logged out successfully');
  }
  }


