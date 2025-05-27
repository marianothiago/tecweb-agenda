import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:5000/api/v1/user/login';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  

  constructor(private http: HttpClient) { }

  login(userParam: { username: any; password: string | null | undefined; }): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}`,
      JSON.stringify({ "username": userParam.username, "password": userParam.password }), {
      "headers":
        this.headers
    }).pipe(
      map(data => {
        return data;
      })
    );
  }
  isLoggedIn(): boolean {
    if (sessionStorage.getItem("token")) {
      return true;
    }
    return false;
  }
  setToken(token: string) {
    sessionStorage.setItem("token", token);
  }
  getToken(): string {
    return sessionStorage.getItem("token") ?? '';
  }
  logout() {
    sessionStorage.removeItem("token");
  }

}
