import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';





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
  fileList:any =[];
  uploadFormShow = true;
  searchValue: string;
  uploadForm:FormGroup;
  showAssociate: FormGroup;
  // employee:Dessert[];

  totalRecords: any;
  page: Number=1;
  tableShow: boolean;
  uploadArray=[];
  date: Date;
  finalArray = [];
  spinner= false;
  noContent:string;
  constructor(

    private fb : FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createFileUpload();
    this.createShowForm();
    // this.getEmployee();



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


      var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});
      this.finalArray = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        console.log("arraylist hare: ",arraylist);
        // this.fileList.push(arraylist);
        console.log(this.fileList ,'wwwwwwwwwww');




  }
}

createFileUpload(){
  this.uploadForm = this.fb.group({
    file:['', Validators.required],
    date:['', Validators.required]
  })
}

get l(){
  return this.uploadForm.controls;
}

createShowForm(){
  this.showAssociate = this.fb.group({
    date1 : ['']
  })
}
get f(){
  return this.showAssociate.controls;
}

onSubmit(){


  console.log(this.uploadForm.value);
  this.data.push(this.uploadForm.value);
  this.fileList.push({
    fileName: this.l.file.value,
    date: this.l.date.value,
    file: this.finalArray,
  });
//   let map = {};
//   let result = false;
//   for(var i=0;i<this.fileList.length; i++){
//     if(map[this.fileList[i]]) {
//       result = true;
//       // terminate the loop
//       break;
//    }
//    map[this.fileList[i]] = true;
//   }
//   if(result) {
//     console.log('Array contains duplicate elements');
//     alert('Either you  are uploading same file on same date or one file on same date');
//     let uniqueChars = [];
//     this.fileList.forEach((c:any) => {
//     if (!uniqueChars.includes(c)) {
//         uniqueChars.push(c);
//         // this.uploadForm.reset();
//     }
// });

// return console.log(uniqueChars);
//  } else {
//     console.log('Array does not contain duplicate elements');
//  }

  this.uploadForm.value;

  this.uploadFormShow = false;
  // debugger;
  // this.removeDuplicates(this.data);
  // this.removeDuplicates(this.fileList);
  this.toastr.success('File Uploaded successfully...!!!')
}


showAss(){

this.data.map( res => console.log(res))
console.log(this.data + 'working here')

for(var j=0; j<this.fileList.length; j++){
  if((this.f.date1.value === this.fileList[j].date)){
      this.spinner = true
      setTimeout(() => {
        this.spinner = false;
        this.file = this.fileList[j].file;
        this.tableShow = true;
      }, 2000);
      return console.log('date mmatched')
    // }
  }
}
  this.tableShow = false;
  this.noContent = `No records found on this date ${this.f.date1.value}`
}


showAssociates(){
  ///table show strategy
  this.tableShow = false;





}

show(){
  this.tableShow = true;
}



sortData(sort: Sort) {
  const data = this.file.slice();
  if (!sort.active || sort.direction === '') {

    this.file = data;
    return;
  }

  this.file = data.sort((a, b) => {
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




removeDuplicates(array) {
  debugger;
  let x = {};
  array.forEach((i) => {
    if(!x[i]) {
      x[i] = true
    }
  })
  return Object.keys(x)
}











}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}




