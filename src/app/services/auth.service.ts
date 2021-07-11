import { environment } from './../../environments/environment.prod';


import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }
  signin(credentials:any): Observable<any> {
    return this.http.post(base_url + 'auth/signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
  signOut(): void {
    window.sessionStorage.clear();
  }

  change_password(formdata:any){
    return this.http.post(base_url+'/auth/change_password', formdata);
  }
}
