import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.url = environment.basePathBff;
  }

  login(data: any) {
    return this.http.post<any>(`${this.url}/auth`, data)
      .pipe(map(response => {
        if (response) {
          const { token } = response;
          this.setDataInLocalStorage(token);
        }
        return true;
      }));
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  private setDataInLocalStorage(token: string) {
    const userData = jwt_decode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getToken(): string {
    let token: any = null;
    token = localStorage.getItem('token');
    return token;
  }

  getUserData(): any {
    let userData: any = null;
    userData = localStorage.getItem('userData');
    return JSON.parse(userData);
  }

  isLoggedIn() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  isAdmin(): any {
    const userData = this.getUserData();
    const { roleId } = userData;
    if (roleId !== 1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  isDev(): any {
    const userData = this.getUserData();
    const { roleId } = userData;
    if (roleId !== 2) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
