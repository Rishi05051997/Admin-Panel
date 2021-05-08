import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,

    ) { }
  addForm: FormGroup;
  usercontact: HrModel;
  _id:string;

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  ngOnInit() {
    this.createEditForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    // const userId = localStorage.getItem('editUserId');
    // if (!userId) {
    //   alert('Invalid action.');
    //   this.router.navigate(['']);
    //   return;
    // }

    // const data = this.userService.getUserById(+userId);
    // this.addForm.setValue(data);
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
        status: [],
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
    // this.userService.update(this.addForm.value);
    // this.toastr.success(' Hr Updated Successfully..!!')
    // this.router.navigate(['/dashboard', 'hr']);
    if (!this.addForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.userService.updateEmployee(id, this.addForm.value)
          .subscribe(res => {
            this.router.navigate(['/dashboard', 'hr']);
            this.toastr.success(' Hr Updated Successfully..!!')
            console.log('Content updated successfully!')
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
