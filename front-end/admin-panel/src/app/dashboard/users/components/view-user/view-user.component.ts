import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../models/users-model';
import { UsersServiceService } from '../share/users-service.service';




@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  usercontact:Users = {
    _id:'',
    empId : '',
    name: '',
    email: '',
    status: 'false',
    location: '',
    role:'',
    password:''
  };
  id:any;
  status:boolean;
  showAddUser:boolean;
  allUsers:any;
  lat:number;
  lng:number;
  location: Object;
  constructor(
    private router : Router,
    private userService: UsersServiceService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.actRoute.params.subscribe(
      res => {
        this.id = res['id'];
        console.log(this.id);
        this.getEmployee(this.id);
      }
    )
    this.readEmployee();

}


readEmployee(){
  this.userService.getEmployees().subscribe((data) => {

    console.log(data)
   this.allUsers = data;
   const array:any = JSON.parse(localStorage.getItem('token'));

   for(var i=0; i<this.allUsers.length;i++){
    if(array.email == this.allUsers[i].email && this.usercontact.email == array.email && this.usercontact.email == array.email){

      if(this.allUsers[i].status){
        return this.showAddUser = true;
      }
      else{
        return this.showAddUser = false;
      }

    }

    // else {

    // }
    //  console.log(this.status , 'STATUS COMING HERE');
   }

  })
}



  getEmployee(id:string) {
    this.userService.getEmployee(id).subscribe((data:Users) => {
      this.usercontact = data;
      console.log(this.usercontact);
      // this.status = data.status
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard', 'hr']);
  }

}
