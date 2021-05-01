import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrModel } from '../share/hr-model';
import { HrServiceService } from '../share/hr-service.service';

@Component({
  selector: 'app-add-hr',
  templateUrl: './add-hr.component.html',
  styleUrls: ['./add-hr.component.scss']
})
export class AddHrComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: HrServiceService,
    private toastr : ToastrService
    ) { }
  addForm: FormGroup;
  @Output()
  createUsercontact = new EventEmitter<HrModel>();

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  ngOnInit() {
  this.addForm = this.formBuilder.group({
      id: [],
      empId: ['',Validators.compose([Validators.required,  Validators.pattern('^[0-9]{1,7}$')]) ],
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      email: ['',  Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      password: ['', Validators.required],
      location: ['', Validators.required],
      role: ['', Validators.required],
      status: [''],
    });
  }

  // isInvalid(name: string) {
  //   const control = this.addForm.get(name);
  //   return control.invalid && control.dirty;
  // }

  // isEmailInvalid(name: string) {
  //   const control = this.addForm.get(name);
  //   return control.invalid && control.dirty;
  // }

  onSubmit() {
    this.userService.create(this.addForm.value);
    this.toastr.success('New Hr Added Successfully..!!')
    this.router.navigate(['/dashboard', 'hr']);
  }

  onCancel() {
    this.router.navigate(['/dashboard', 'hr']);
  }
  get controls(){
    return this.addForm.controls;
  }
}
