import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Associate } from '../../models/associate';
import { AssociateService } from '../../services/associate.service';
import {remove} from 'lodash';



@Component({
  selector: 'app-associates-listing',
  templateUrl: './associates-listing.component.html',
  styleUrls: ['./associates-listing.component.scss']
})
export class AssociatesListingComponent implements OnInit {
  associates: any=[];
  displayedColumns: string[] = ['empId', 'name','location', 'role',  'email', 'status','action'];
  dataSource:any=[];
  animal: any;
  name: any;
  constructor(
    private associateService: AssociateService,
    private router : Router,
    private snackBar : MatSnackBar
    
    ) { }

  ngOnInit(): void {
    this.getAssociate();
  }

  

  getAssociate(){
    this.associateService.getAssociates().subscribe((res: any) => {
      this.dataSource = res;
      // this.associates = res;
    }, (err: any) => this.errorHandler(err, 'Failed to fetch Associates'));
  }

  saveBtnHandler(){
    return this.router.navigate(['dashboard', 'associates', 'new'])
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteAssociate(id:string){
    this.associateService.deleteAssociate(id).subscribe((res: any) =>{
      const removedItems = remove(this.dataSource, (item:any) => {
        return item._id === res._id
      });
      this.dataSource = [...this.dataSource];

      this.snackBar.open('Associate Deleted Successfully', 'Success',{
        duration: 5000
      })
    },
      (    err: any) =>this.errorHandler(err, 'Failed to Delete Associate')
    )

  }

  editAssociate(id:string){
    this.router.navigate(['dashboard','associates',`${id}`]);
  }

  private errorHandler(error:any, message:any){
    console.log(error);
    this.snackBar.open(message, 'Error', {
      duration: 5000
    })
  }

  

}





