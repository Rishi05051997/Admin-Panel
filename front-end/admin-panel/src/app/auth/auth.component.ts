import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtService } from '../core/service/jwt.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm = new FormGroup({});
  title = '';
  isLoadingResults: boolean = false;
  password: boolean;
  constructor(
    private fb : FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router : Router,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }


  initForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:  ['', Validators.required],
    })
  }

  get Controls(){
    return this.authForm.controls;
  }

  onSubmit(){
    // if title is signup 
    // we need to send the request for signup
    if(this.title === 'Signup'){
      this.isLoadingResults = true;
      // we need to send the request for signup
      this.authService.SignUp(this.authForm.value).subscribe(
        data => {
          // debugger;
          console.log(data);
          // this.jwtService.setToken(data.token);
          this.router.navigate(['/login']);
          this.snackBar.open('User Created Successfully,You need to login first', 'Success',{
            duration: 5000
          })
        }
        // , err  => this.errorHandler(err, 'Failed to Signup'),
        // () => this.isLoadingResults = false
      )

    }
    else {
      this.isLoadingResults = true;
      // else we need to send the request for login

      console.log(this.authForm.value);
      // here we send the request to the server
      this.authService.login(this.authForm.value)
      .subscribe(data => {
        console.log(data)
        this.jwtService.setToken(data.token);
        this.router.navigate(['/dashboard', 'associates']);
        this.snackBar.open('User Login Successfully', 'Success',{
          duration: 5000
        })
      }
      , err => this.errorHandler(err, 'Failed to Login'),
      () => this.isLoadingResults = false
    
    
    )};
    
    }
   
  
  private errorHandler(error:any, message:any){
    this.isLoadingResults = false;
    console.log(error);
    this.snackBar.open(message, 'Error', {
      duration: 5000
    })
  }

  togglePasswordFieldType() {
    this.password = !this.password   
  }


}
