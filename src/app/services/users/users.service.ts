import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.url = environment.basePathBff;
  }

  getDevs() {
    return this.http.get(`${this.url}/role/dev/users`);
  }
}
