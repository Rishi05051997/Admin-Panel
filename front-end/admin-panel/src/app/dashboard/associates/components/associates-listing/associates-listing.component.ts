import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Associate } from '../../models/associate';
import { AssociateService } from '../../services/associate.service';
import {remove} from 'lodash';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-associates-listing',
  templateUrl: './associates-listing.component.html',
  styleUrls: ['./associates-listing.component.scss']
})
export class AssociatesListingComponent implements OnInit {
  associates: any=[];
  displayedColumns: string[] = ['empId', 'name', 'email', 'status','action'];
  dataSource:any=[];
  animal: any;
  name: any;
  resultsLength = 0;
  isresultsLoading = false;
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    // if (this.dataSource){
    //   this.dataSource.paginator = value;
    // }
    // debugger;
   
    this.associateService.getAssociates()
    .subscribe((data:any)=> {
      // debugger
      this.isresultsLoading = true;
      console.log(data);
      this.dataSource = data.docs;
      this.resultsLength = data.total;
      // this.isresultsLoading = false;

    }, err => this.errorHandler(err, 'Failed to fetch associates'),
    () => {
      this.isresultsLoading = false;
    }
    );
  }

  // @ViewChild(MatSort, {static: false})
  // set sort(value: MatSort) {
  //   // if (this.dataSource){
  //   //   this.dataSource.sort = value;
  //   // }
  //   value.sortChange.subscribe((data:any) => {
  //     debugger;
  //     console.log(data);
  //     this.dataSource = data.docs;
  //   })
  // }



  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  constructor(
    private associateService: AssociateService,
    private router : Router,
    private snackBar : MatSnackBar
    
    ) { }

  ngOnInit(): void {
    // this.paginator.page.subscribe((data:any) => {console.log(data)})
    this.getAssociate();
  }

  

  getAssociate(){
    // debugger;

    this.isresultsLoading = true;
    this.associateService.getAssociates().subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.docs;
      this.resultsLength = res.total;
      // this.isresultsLoading = false;
      // this.associates = res;
    }, (err: any) => this.errorHandler(err, 'Failed to fetch Associates'),
    () => {
      this.isresultsLoading = false;
    });
  }

  saveBtnHandler(){
    return this.router.navigate(['dashboard', 'associates', 'new'])
  }

  navigateToUpload(){
    return this.router.navigate(['dashboard', 'upload'])
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
    this.isresultsLoading = false;
    console.log(error);
    this.snackBar.open(message, 'Error', {
      duration: 5000
    })
  }

  filterValue(event:any){
    console.log(event);

  }


 
  

}





