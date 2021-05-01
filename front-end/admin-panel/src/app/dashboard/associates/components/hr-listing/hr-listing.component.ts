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
  usercontacts: HrModel[]; // Array<string>
  usercont: HrModel;
  page: Number=1;
  totalRecords: any;
  constructor(
    private ucs: HrServiceService,
    private router: Router,
    private toastr : ToastrService
    ) {
  }

  editUserContact(usercontact: HrModel) {
    console.log(usercontact);
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUserId', usercontact.id.toString());
    this.router.navigate(['/dashboard','edit']);
    // this.ucs.update(usercontact);
  }

  deleteUserContact(usercontact: HrModel) {
    console.log(usercontact);

    this.ucs.delete(usercontact);
    this.toastr.success('User deleted successfully');
    const array:any = JSON.parse(localStorage.getItem('token'));
    if(usercontact.email === array.email){
      localStorage.removeItem('token');
    }

  }

  ngOnInit() {
    console.log('usercontact:init');
    this.usercontacts = this.ucs.getall();
    console.log(this.usercontacts);
    this.validateUser();
  }

  viewUserContact(usercontact: HrModel){
    console.log(usercontact);
    localStorage.removeItem('viewUserId');
    localStorage.setItem('viewUserId', usercontact.id.toString());
    this.router.navigate(['/dashboard','view']);
  }


  validateUser(){
    var array = JSON.parse(localStorage.getItem('token'));
    console.log(array);
    // for(var i=0;i<arr.length; i++){
      // debugger;
      // if(array.email === 'vrushabh@gmail.com'){
      //   // debugger;
      //   this.user = 'Admin'
      // }else{
      //   this.user = 'Normal'
      // }
     for(var i=0; i<this.usercontacts.length; i++){
       console.log(this.usercontacts[i].email)
      //  debugger;
       if(array.email === this.usercontacts[i].email){
        // if(this.controls.status.value === true){
        //   this.user = true;
        // }else {
        //   this.user = false;
        // }

         return null;
       }


      //  else {
      //    alert('Something went wrong')
      //  }

     }
    //  this.usercontacts.push(array);


    // }
  }
  navigateToUpload(){
    return this.router.navigate(['dashboard', 'upload'])
  }

}
