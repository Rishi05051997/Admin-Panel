import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../../models/users-model';

import { UsersServiceService } from '../share/users-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersServiceService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,

    ) { }
  addForm: FormGroup;
  usercontact: Users;
  _id:string;

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  ngOnInit() {
    this.createEditForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    // this.addForm.controls.status.disable();

  }


    createEditForm(){
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

    getEmployee(id) {
      this.userService.getEmployee(id).subscribe(data => {
        this.addForm.setValue({
          // id:data['id'],
          empId: data['empId'],
          name: data['name'],
          email: data['email'],
          password: data['password'],
          location: data['location'],
          role: data['role'],
          status: data['status'],
        });
      });
    }

    isInvalid(name: string) {
    const control = this.addForm.get(name);
    return control.invalid && control.dirty;
  }

  isEmailInvalid(name: string) {
    const control = this.addForm.get(name);
    return control.invalid && control.dirty;
  }

  onSubmit() {
    if (!this.addForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.userService.updateEmployee(id, this.addForm.value)
          .subscribe(res => {
            //// sending updated  email & password to localstoage if change
            // debugger;
            var localStorageArray = {
              email: this.addForm.controls.email.value,
              password: this.addForm.controls.password.value
            }
            localStorage.setItem('token', JSON.stringify(localStorageArray));
            this.router.navigate(['/dashboard', 'hr']);
            this.toastr.success(' Employee Updated Successfully..!!')
            // console.log('Content updated successfully!')
          }, (error) => {
            this.toastr.error(' something went wrong')
            console.log(error)
          })
      }
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard', 'hr']);
  }

  get controls(){
    return this.addForm.controls;
  }

}
