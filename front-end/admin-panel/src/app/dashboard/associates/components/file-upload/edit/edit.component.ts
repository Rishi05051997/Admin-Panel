import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editEmployeeForm: FormGroup;
  id:number;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createEditEmployeeForm();

    this.ActivatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        console.log(this.id)
        this.patchEditForm(this.id);
      }
    )

  }

  createEditEmployeeForm(){
    this.editEmployeeForm = this.fb.group({
      Name:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      address:['',[Validators.required]],
      phoneNo:['',[Validators.required, Validators.pattern('^[7-9][0-9]{9}$')]],
      Qualification:['',[Validators.required]],
      Experience:['',[Validators.required]],
      Interest:['',[Validators.required]],
      // date:['',[Validators.required]]
    })
  }

  patchEditForm(id){
    this.employeeService.getEmployeeById(id).subscribe(
      res => {
        this.editEmployeeForm.patchValue(res);
      }
    )
  }

  get Controls(){
    return this.editEmployeeForm.controls;
  }

  onSubmit(){
   this.employeeService.putEmployee(this.id, this.editEmployeeForm.value).subscribe(
     res => {
       this.router.navigate(['/dashboard','upload'])
       this.toastr.success('Associated Updated Successfully');
     }
   )
  }

}
