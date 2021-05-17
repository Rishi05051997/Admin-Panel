import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { UsersServiceService } from '../dashboard/users/components/share/users-service.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm:FormGroup;
  title = 'Login';
  isLoadingResults: boolean = false;
  password: boolean;
  usercontacts: any;

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private snackBar : MatSnackBar,
    private _userService: UsersServiceService,
    private _authService : AuthService

  ) { }

  ngOnInit(): void {
    this.initForm();

    // this._userService.getEmployees().subscribe(
    //   data =>
    //   {
    //     console.log(data);
    //     this.usercontacts = data;
    //   }
    // )
    // console.log(this.usercontacts);
  }


  initForm() {
    this.authForm = this.fb.group
    ({
      email: ['', [Validators.required, Validators.email]],
      password:  ['', Validators.required],

    })
  }



  get Controls(){
    return this.authForm.controls;
  }

  onSubmit(){

      // if(this.usercontacts){
      //   // debugger;
      //   for(var i=0; i<this.usercontacts.length; i++){
      //     if((this.authForm.controls.email.value == this.usercontacts[i].email ) && (this.authForm.controls.password.value == this.usercontacts[i].password )){
      //       if(this.usercontacts[i]){
      //         localStorage.setItem('token', JSON.stringify(this.authForm.value));
      //         this.router.navigate(['/dashboard', 'hr']);
      //         return this.snackBar.open(`User ${this.usercontacts[i].email} login successful`, 'Success', {
      //           duration: 4000
      //         })

      //       }
      //     }
      //   }
      //   this.snackBar.open('Invalid Credentials', 'Error', {
      //       duration: 2000
      //   })
      // }
    // debugger;
      this._authService.loginUser(this.authForm.value).subscribe(
        res => {
          localStorage.setItem('token', JSON.stringify(this.authForm.value));
              this.router.navigate(['/dashboard', 'hr']);
              return this.snackBar.open(`User ${this.authForm.controls.email.value} login successful`, 'Success', {
                duration: 4000
              })
        },
        err => {

          this.snackBar.open('Invalid Credentials', 'Error', {
                  duration: 2000
              })
        }
      )

  }

  togglePasswordFieldType() {
    this.password = !this.password
  }


}
