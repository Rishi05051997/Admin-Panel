import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsersServiceService } from '../share/users-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersServiceService,
    private toastr : ToastrService,
    private ngZone: NgZone,
    ) { }


  ngOnInit() {
  this.addForm = this.formBuilder.group({
      // id: [],
      empId: ['',Validators.compose([Validators.required,  Validators.pattern('^[0-9]{1,7}$')]) ],
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      email: ['',  Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      password: ['', Validators.required],
      location: ['', Validators.required],
      role: ['', Validators.required],
      status: ["",],
    });
  }

  onSubmit() {
    // this.userService.create(this.addForm.value);
    // debugger;
    if (!this.addForm.valid) {
      return false;
    } else {
      this.userService.createEmployee(this.addForm.value).subscribe(
        (res) => {
          // console.log('Employee successfully created!')
          this.toastr.success('New User Added Successfully..!!')
          this.router.navigate(['/dashboard', 'hr']);

        }, (error) => {
          console.log(error);
        });
    }

  }

  onCancel() {
    this.router.navigate(['/dashboard', 'hr']);
  }
  get controls(){
    return this.addForm.controls;
  }
}
