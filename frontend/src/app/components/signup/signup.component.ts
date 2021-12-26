import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { SignupService } from '../../services/signup.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  Role: string[] = ['Admin','User'];
  Gender: string[] = ['Male','Female'];

  signupForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z]+$')]),
    password: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    gender: new FormControl('',[Validators.required]),
    birth: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required,Validators.pattern('^[0-9]{10}')]),
    role: new FormControl('',[Validators.required]),
    dt: new FormControl('',[Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private sup: SignupService, private router: Router) { }

  ngOnInit(): void {
  }

  signup(){
    console.log(this.signupForm.value);
    this.sup.signup(this.signupForm.value).subscribe(
      data => {
        if(!data){
          alert('Can not signup!444');
        }else{
          alert('Can signup!!');

        }
      },
      err =>{
        console.log(err);
        alert('Can not signup!');
      }
    );
  }

  get email(){
    return this.signupForm.get('email') as FormArray;
  }

  get username(){
    return this.signupForm.get('username') as FormArray;
  }

  get phone(){
    return this.signupForm.get('phone') as FormArray;
  }

  get password(){
    return this.signupForm.get('password') as FormArray;
  }

  back(){
    this.router.navigate(['/login'])
  }
}

