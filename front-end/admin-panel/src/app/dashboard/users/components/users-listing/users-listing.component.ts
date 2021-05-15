import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../../models/users-model';

import { UsersServiceService } from '../share/users-service.service';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  usercontacts: any=[]; // Array<string>
  usercont: Users;
  page: Number=1;
  totalRecords: any;
  status:boolean;
  searchTerm: string;
  searchContacts:any;

  constructor(
    private userService: UsersServiceService,
    private router: Router,
    private toastr : ToastrService,

    ) {
  }

  /////////
  ngOnInit() {
    this.readEmployee();

  }

  readEmployee(){
    this.userService.getEmployees().subscribe((data) => {
      console.log(data)
     this.usercontacts = data;
      this.searchContacts = this.usercontacts;
    })
  }

  search(value: string): void {
    this.usercontacts = this.searchContacts.filter((val) => val.name.toLowerCase().includes(value));
  }

  removeEmployee(usercone) {
    // debugger;
    const array:any = JSON.parse(localStorage.getItem('token'));
    // console.log(usercone);
    // debugger;
    if(array.email == usercone.email){
      return this.toastr.error('As You are already logged in..!!! You dont access to perform this operation');
    }
    // debugger;
    for(var i =0;i<this.usercontacts.length;i++){
      if(array.email == this.usercontacts[i].email){
        if(this.usercontacts[i].status == "true" || this.usercontacts[i].status == true){
          if(window.confirm('Are you sure?')) {
            this.userService.deleteEmployee(usercone._id).subscribe((data) => {
              // console.log(data);
                this.usercontacts.splice(this.usercontacts.indexOf(usercone), 1);
                this.readEmployee();
                return this.toastr.success('Delete Successfully.!!!');
              // }

              // console.log(data);

            }, err => {
              this.toastr.error('Wrong ....!!!');
              return console.log(err)
              }
          )
        }
        }
        else {
          return this.toastr.error('As you have no admin access you dont able to perform this operation');
        }
      }
    }

  }

  navigateToUpload(){
    return this.router.navigate(['dashboard', 'upload'])
  }




}
