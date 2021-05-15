import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/service/jwt.service';
import { UsersServiceService } from '../../users/components/share/users-service.service';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user:string;
  role: string;
  @Output() tooggleSidenav = new EventEmitter
  constructor(
    private jwtService: JwtService,
    private router : Router,
    private snackBar : MatSnackBar,
    private userService: UsersServiceService

  ) { }

  ngOnInit(): void {
    const array:any = JSON.parse(localStorage.getItem('token'))
    this.userService.getEmployees().subscribe(
      data => {
        const users:any = data;
        for(var i=0; i<users.length;i++){
          if(array.email === users[i].email){
                   this.user = users[i].email;
            return this.role = users[i].role
          }
          this.role = users[i].role
          // else  {
          //   this.user = users[i].email,
          //   this.role = users[i].role
          // }


        }
        return this.user = array.email;
      }
    )


    // this.user = array.email

  }

  toogle(){
    this.tooggleSidenav.emit()

  }

  logout(){
    this.jwtService.destroyToken();
    this.router.navigate(['/login']);
    this.snackBar.open('User Logout Successfully', 'Success',{
      duration: 5000
    })
  }



}
