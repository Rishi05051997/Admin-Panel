import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/service/jwt.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user:string;

  @Output() tooggleSidenav = new EventEmitter
  constructor(
    private jwtService: JwtService,
    private router : Router,
    private snackBar : MatSnackBar

  ) { }

  ngOnInit(): void {
    const array:any = JSON.parse(localStorage.getItem('token'));

    this.user = array.email

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
