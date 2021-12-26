import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  users: any;

  constructor(private http: HttpClient, public local:LocalStorageService) { }

  signup(user : any){
    return this.http.post<any>('http://localhost:3000/signup/adduser', user)
    .pipe(map(data => {
      return data;
    }));
  }

  getusers(){
    return this.http.get<any>('http://localhost:3000/users/get')
    .pipe(map(data => {
      if (data) {
        this.users = data;
        console.log(this.users);
      }
      return this.users;
    }));
  }
}
