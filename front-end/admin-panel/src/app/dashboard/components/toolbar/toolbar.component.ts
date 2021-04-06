import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  

  @Output() tooggleSidenav = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }

  toogle(){
    this.tooggleSidenav.emit()
    
  }

}
