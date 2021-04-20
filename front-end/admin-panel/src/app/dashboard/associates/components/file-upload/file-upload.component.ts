import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { SearchfilterPipe } from "./../../../pipe/searchfilter.pipe";
import { EmployeeService } from './service/employee.service';



export interface Dessert {
  Name: string;
  address: string;
  phoneNo: number;
  Qualification: string;
  Experience: string;
  Interest: string;
  Date: Date;
}

// export interface Upload {
//   Name: string;
//   address: string;
//   phoneNo: number;
//   Qualification: string;
//   Experience: string;
//   Interest: string;
  
//   date: Date;
// }

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
 
})
export class FileUploadComponent implements OnInit {

  data: any=[];
  file: any;
  arrayBuffer:any;
  fileList:Dessert[];
  
  searchValue: string;
  uploadForm= new FormGroup({});
  employee:Dessert[];
  date= new Date('');
  totalRecords: any;
  page: Number=1;
  
  constructor(
    private employeeService: EmployeeService,
    private fb : FormBuilder,
  ) { }

  ngOnInit(): void {
    
    this.getEmployee();
    
  }
  addfile(event)     
  {    
  this.file= event.target.files[0];     
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];
      this.data = XLSX.utils.sheet_to_json(worksheet,{raw:true})    
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist:Dessert[] = XLSX.utils.sheet_to_json(worksheet,{raw:true});    
        console.log("arraylist hare: ",arraylist); 
        this.fileList = XLSX.utils.sheet_to_json(worksheet,{raw:true});  
        const array:Dessert[] = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        // this.isTableShoe = true;
        console.log(this.date)
        for(var j = 0; j != this.fileList.length; ++j){
          console.log( arraylist[j]);
          // if(this.uploadForm.get('date').value == this.fileList[j].Date){
          //   debugger;
          //   return this.date =  this.fileList[j].Date
          // }
          
          console.log(this.fileList[j].Date)
        }
        
        
            // this.fileList = [];    
            // console.log(this.fileList)    
    
  }    
} 







///////

getEmployee(){
  this.employeeService.getEmployee().subscribe(
    res => {
      // console.log(res, 'RESPONSE')
      console.log(res.length, 'RESPONSE')
      this.employee = res;
      this.totalRecords = res.length;
      
     

      console.log('Employees are here', res);

    }
  )
}

deleteEmployee(id){
  // alert('Are you sure?');
  this.employeeService.deleteEmployee(id).subscribe(
    res => {
      this.getEmployee();
    }
  )
}

sortData(sort: Sort) {
  const data = this.employee.slice();
  if (!sort.active || sort.direction === '') {
    this.employee = data;
    return;
  }

  this.employee = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'name': return compare(a.Name, b.Name, isAsc);
      case 'exp': return compare(a.Experience, b.Experience, isAsc);
      // case 'fat': return compare(a.fat, b.fat, isAsc);
      // case 'carbs': return compare(a.carbs, b.carbs, isAsc);
      // case 'protein': return compare(a.protein, b.protein, isAsc);
      default: return 0;
    }
  });
}






}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}




