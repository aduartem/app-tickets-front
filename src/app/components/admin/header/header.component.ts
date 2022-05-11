import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  user: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.user = this.authService.getUserData();
  }

  logout(): void {
    this.authService.logout();
  }

}
