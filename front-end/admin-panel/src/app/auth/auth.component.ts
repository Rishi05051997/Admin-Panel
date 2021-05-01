import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { remove } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { JwtService } from '../core/service/jwt.service';
import { AuthService } from '../core/services/auth.service';
import { HrModel } from '../dashboard/associates/components/share/hr-model';
import { HrServiceService } from '../dashboard/associates/components/share/hr-service.service';
import { AssociateService } from '../dashboard/associates/services/associate.service';

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
  email;
  pass;
  associates;
  usercontacts: HrModel[];
  user: boolean = true;
  constructor(
    private fb : FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router : Router,
    private snackBar : MatSnackBar,
    private associateService: AssociateService,
    private ucs: HrServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.title = this.router.url === '/login' ? 'Login' : 'Signup';
    // this.getAssociates();
    this.usercontacts = this.ucs.getall();
    console.log(this.usercontacts);
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

      if(this.usercontacts){
        // debugger;
        for(var i=0; i<this.usercontacts.length; i++){
          if((this.authForm.controls.email.value == this.usercontacts[i].email ) && (this.authForm.controls.password.value == this.usercontacts[i].password )){
            if(this.usercontacts[i]){
              localStorage.setItem('token', JSON.stringify(this.authForm.value));
              this.router.navigate(['/dashboard', 'hr']);
              return this.snackBar.open(`User ${this.usercontacts[i].email} login successful`, 'Success', {
                duration: 4000
              })

            }

          }





        }
        this.snackBar.open('Invalid Credentials', 'Error', {
          duration: 2000
        })
      }
      // if(this.user === true){

      //   return  null;

      // }
      // if(this.user === false){

      //   return  alert('Invalid action.');

      // }

      ////
      // if(this.authForm.value){
      //   this.usercontacts.map( res => {
      //     if((this.authForm.controls.email.value == res.email ) && (this.authForm.controls.password.value == res.password )){
      //       localStorage.setItem('token', JSON.stringify(this.authForm.value));
      //       this.router.navigate(['/dashboard', 'hr']);
      //       // this.snackBar.open('user login successfull', 'Success', {
      //       //   duration: 2000
      //       // })
      //     }else if (this.authForm.controls.email.value !== res.email){
      //       this.snackBar.open('Invalid Credentials', 'Error', {
      //         duration: 2000
      //       })

      //     }
      //   })
      // }



      // this.associateService.loginAssociate(this.authForm.value).subscribe(res => {


      }

    // }
      showError(){

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
