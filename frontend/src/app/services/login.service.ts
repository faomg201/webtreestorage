import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, public local:LocalStorageService) { }

  signIn(loginData: any){
    return this.http.post<any>('http://localhost:3000/login/signin', loginData)
      .pipe(map(data => {
        if(data){
          this.local.set('user', data, 1, 'w');
          console.log(this.local.get('user'));
        }
        return data;
      }));
  }
}
