import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share, flatMap } from 'rxjs/operators';
import { User } from 'src/app/core/widgets/models/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {

  public currentUser: User;

  constructor(private http: HttpClient) {
    const data = JSON.parse(sessionStorage.getItem('currentUser'));
    this.currentUser = data ? new User(data) : null;
  }

  authenticate(email: string, password: string) {
    return this.http.post(`${environment.baseUrl}/api/login_check`, {
      email,
      password
    }).pipe(
      map((response: { token: string; user: string }) => {
        const user = new User(JSON.parse(response.user));
        user.token = response.token; console.log(user);
        this.login(user);
        return user;
      })
    ).pipe(share());
  }

  storeToken(user: User): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  hasToken() {
    if (this.currentUser) {
      return true;
    }
    return false;
  }

  getToken() {
    if (this.hasToken) {
      return this.currentUser.token;
    }
    return false;
  }

  login(user: User): void {
    if (user.token) {
      this.storeToken(user);
    }
  }

  public create(user: any) {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      email: user.email,
      password: user.password
    };
    return this.http.post(`${environment.baseUrl_users}`, data, {headers: {'Content-Type': 'application/json'}}).pipe(
      flatMap(res => this.authenticate(user.email, user.password))
    );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
