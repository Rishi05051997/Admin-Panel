import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/service/jwt.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  

  @Output() tooggleSidenav = new EventEmitter
  constructor(
    private jwtService: JwtService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  toogle(){
    this.tooggleSidenav.emit()
    
  }

  logout(){
    this.jwtService.destroyToken();
    this.router.navigate(['/login']);
  }



}
