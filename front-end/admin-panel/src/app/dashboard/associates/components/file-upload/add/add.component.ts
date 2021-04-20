import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addEmployeeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router : Router,
    private toastr: ToastrService
    
  ) { }

  ngOnInit(): void {
    this.createEmployeeForm();
  }

  createEmployeeForm(){
    this.addEmployeeForm = this.fb.group({
      Name:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      address:['',[Validators.required]],
      phoneNo:['',[Validators.required, Validators.pattern('^[7-9][0-9]{9}$')]],
      Qualification:['',[Validators.required]],
      Experience:['',[Validators.required]],
      Interest:['',[Validators.required]],
      // date:['',[Validators.required]]
    })
  }

  get Controls(){
    return this.addEmployeeForm.controls;
  }

  onSubmit(){
    this.employeeService.postEmployee(this.addEmployeeForm.value).subscribe(
      res => {
        console.log('Post request here ',res);
        this.toastr.success('Associated Added');
        this.router.navigate(['dashboard','upload'])
      }
    )
  }
  get phoneNo() {
    return this.addEmployeeForm.get('phoneNo');
  }

}
