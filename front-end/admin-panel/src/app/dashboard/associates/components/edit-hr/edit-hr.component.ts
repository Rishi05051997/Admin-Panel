import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrModel } from '../share/hr-model';
import { HrServiceService } from '../share/hr-service.service';

@Component({
  selector: 'app-edit-hr',
  templateUrl: './edit-hr.component.html',
  styleUrls: ['./edit-hr.component.scss']
})
export class EditHrComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: HrServiceService,
    private toastr: ToastrService

    ) { }
  addForm: FormGroup;
  usercontact: HrModel;

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  ngOnInit() {
    const userId = localStorage.getItem('editUserId');
    if (!userId) {
      alert('Invalid action.');
      this.router.navigate(['']);
      return;
    }
  this.addForm = this.formBuilder.group({
    id: [],
    empId: ['',Validators.compose([Validators.required,  Validators.pattern('^[0-9]{1,7}$')]) ],
    name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
    email: ['',  Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
    password: ['', Validators.required],
    location: ['', Validators.required],
    role: ['', Validators.required],
    status: [],
    });
    const data = this.userService.getUserById(+userId);
    this.addForm.setValue(data);
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
    this.userService.update(this.addForm.value);
    this.toastr.success(' Hr Updated Successfully..!!')
    this.router.navigate(['/dashboard', 'hr']);
  }

  onCancel() {
    this.router.navigate(['/dashboard', 'hr']);
  }

  get controls(){
    return this.addForm.controls;
  }

}
