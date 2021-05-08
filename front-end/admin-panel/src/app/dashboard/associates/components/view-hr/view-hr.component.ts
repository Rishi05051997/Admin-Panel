import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HrServiceService } from '../share/hr-service.service';

@Component({
  selector: 'app-view-hr',
  templateUrl: './view-hr.component.html',
  styleUrls: ['./view-hr.component.scss']
})
export class ViewHrComponent implements OnInit {
  usercontact: any;
  id:any;
  constructor(
    private router : Router,
    private userService: HrServiceService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // const userId = localStorage.getItem('viewUserId');
    // if (!userId) {
    //   alert('Invalid action.');
    //   this.router.navigate(['']);
    //   return;
    // }
    // const data = this.hrService.getUserById(+userId);
    // this.usercontact = data;
    // this.usercontact = this.actRoute.snapshot.paramMap.get('id');
    // console.log(this.usercontact);
    this.actRoute.params.subscribe(
      res => {
        this.id = res['id'];
        console.log(this.id);
        this.getEmployee(this.id);
      }
    )
  }

  getEmployee(id) {
    this.userService.getEmployee(id).subscribe(data => {
      this.usercontact = data;
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard', 'hr']);
  }

}
