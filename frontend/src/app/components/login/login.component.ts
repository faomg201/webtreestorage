import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LocalStorageService } from 'angular-web-storage'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  token: any
  userid: any
  status: boolean|any
  parentColorProperty: any


  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  })

  constructor(public local: LocalStorageService,private router: Router, private auth: LoginService) { }

  ngOnInit(): void {
    this.status = false;
  }

  ngClassMethod() {
    this.status = !this.status;
  }

  signin() {


    //console.log(this.loginForm.value);
    this.auth.signIn(this.loginForm.value).subscribe(
      data => {
        this.token = this.local.get('user').token
        console.log(this.token)
        if(data.status == true && data.result.role === "user"){
          this.token = this.local.get('user').token
          this.router.navigate(['/home'])
        } else if (data.status == true && data.result.role === "admin") {
          this.router.navigate(['/add'])
        } else {
          alert('Usernaem or password is incorrect!');
        }
      },
      err => {
        console.log(err);
        alert('Usernaem or password is incorrect!');
      }
    );
  }
  gettoken(){
    this.token = this.local.get('user').token
    return 12
  }

  getuserid(){
    this.userid = this.local.get('user').result.id
    return this.userid
  }

  signup() {
    this.router.navigate(['/signup'])
  }

  get username(){
    return this.loginForm.get('username') as FormArray;
  }
  get password(){
    return this.loginForm.get('password') as FormArray;
  }

}