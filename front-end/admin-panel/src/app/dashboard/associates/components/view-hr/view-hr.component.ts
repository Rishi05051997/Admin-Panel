import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HrModel } from '../share/hr-model';
import { HrServiceService } from '../share/hr-service.service';

@Component({
  selector: 'app-view-hr',
  templateUrl: './view-hr.component.html',
  styleUrls: ['./view-hr.component.scss']
})
export class ViewHrComponent implements OnInit {
  usercontact: HrModel;
  constructor(
    private router : Router,
    private hrService: HrServiceService
  ) { }

  ngOnInit() {
    const userId = localStorage.getItem('viewUserId');
    if (!userId) {
      alert('Invalid action.');
      this.router.navigate(['']);
      return;
    }
    const data = this.hrService.getUserById(+userId);
    this.usercontact = data;
  }

  onCancel() {
    this.router.navigate(['/dashboard', 'hr']);
  }

}
