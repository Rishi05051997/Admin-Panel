import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrModel } from '../share/hr-model';
import { HrServiceService } from '../share/hr-service.service';

@Component({
  selector: 'app-hr-listing',
  templateUrl: './hr-listing.component.html',
  styleUrls: ['./hr-listing.component.scss']
})
export class HrListingComponent implements OnInit {
  usercontacts: any=[]; // Array<string>
  usercont: HrModel;
  page: Number=1;
  totalRecords: any;
  constructor(
    private userService: HrServiceService,
    private router: Router,
    private toastr : ToastrService,

    ) {
  }

  /////////
  ngOnInit() {
    // console.log('usercontact:init');
    // this.usercontacts = this.ucs.getall();
    // console.log(this.usercontacts);
    this.readEmployee();
    // this.validateUser();
  }

  readEmployee(){
    this.userService.getEmployees().subscribe((data) => {
      console.log(data)
     this.usercontacts = data;
    })
  }

  removeEmployee(employee, index) {
    if(window.confirm('Are you sure?')) {
        this.userService.deleteEmployee(employee._id).subscribe((data) => {
          this.usercontacts.splice(index, 1);
        }
      )
    }
  }

  navigateToUpload(){
    return this.router.navigate(['dashboard', 'upload'])
  }

  // validateUser(){
  //   var array = JSON.parse(localStorage.getItem('token'));
  //   console.log(array);
  //   // for(var i=0;i<arr.length; i++){
  //     // debugger;
  //     // if(array.email === 'vrushabh@gmail.com'){
  //     //   // debugger;
  //     //   this.user = 'Admin'
  //     // }else{
  //     //   this.user = 'Normal'
  //     // }
  //    for(var i=0; i<this.usercontacts.length; i++){
  //      console.log(this.usercontacts[i].email)
  //     //  debugger;
  //      if(array.email === this.usercontacts[i].email){
  //       // if(this.controls.status.value === true){
  //       //   this.user = true;
  //       // }else {
  //       //   this.user = false;
  //       // }

  //        return null;
  //      }


  //     //  else {
  //     //    alert('Something went wrong')
  //     //  }

  //    }
  //   //  this.usercontacts.push(array);


  //   // }
  // }




}
