import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Associate } from '../../models/associate';

@Component({
  selector: 'app-associate-view',
  templateUrl: './associate-view.component.html',
  styleUrls: ['./associate-view.component.scss']
})
export class AssociateViewComponent implements OnInit {
  associate: any;
  constructor(
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) =>{
      console.log(data);
      this.associate = data.associate;
    })
  }

}
