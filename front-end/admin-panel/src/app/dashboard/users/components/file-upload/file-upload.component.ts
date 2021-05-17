import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { UsersServiceService } from '../share/users-service.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],

})
export class FileUploadComponent implements OnInit {
  file: any=[];
  arrayBuffer:any;
  uploadForm:FormGroup;
  showAssociate: FormGroup;
  totalRecords: any;
  page: Number=1;
  tableShow: boolean;
  spinner= false;
  noContent:string;
  getUploadArray:any = [];
  date;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(

    private fb : FormBuilder,
    private toastr: ToastrService,
    private userService : UsersServiceService
  ) { }



  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10);
    this.createFileUpload();
    this.createShowForm();
    // this.getFileUpload()
  }



addfile(event) {
  this.file= event.target.files[0];
  this.fileInput.nativeElement.innerText = (this.file.name)
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


      this.uploadForm.patchValue({file:JSON.stringify(arraylist)});
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

  for(var j=0; j<this.getUploadArray.length; j++){
    if(this.uploadForm.controls.file.value === this.getUploadArray[j].file || this.uploadForm.controls.date.value === this.getUploadArray[j].date){
      var id = this.getUploadArray[j]._id;
      var data = this.uploadForm.value;

      // console.log(data);
      // debugger;
      if(confirm('Wheather you need to override this file?')){
        return this.userService.updateFile(id, data).subscribe(
          res => {
            // console.log(res);
            this.toastr.success('File Updated successfully...!!!')
          }
        )
      }else {

          return null;

      }
    }


  }

this.userService.uploadFile(this.uploadForm.value).subscribe(
    data => {
     this.toastr.success('File Uploaded successfully...!!!')
    }, err => {
      console.log(err);
      this.toastr.error('Some thing went wrong')
    }
  )

}


showAss(){
  this.getFileUpload()
}


showAssociates(){
  this.tableShow = false;
}

show(){
  this.tableShow = true;
}

getFileUpload(){
  debugger;
  this.userService.getFileUploads().subscribe(
    res => {
      debugger;
      console.log(res + 'All files are coming');
      const fa:any = res;
      for(var i=0; i<fa.Msg.length;i++){
        const file1 = fa.Msg[i];
        this.getUploadArray.push(file1);
        var array:any = []
        array = fa.Msg[i].file;
        if(this.f.date1.value === fa.Msg[i].date){
          this.spinner = true
          setTimeout(() => {
            this.spinner = false;
            this.file = (JSON.parse(array));
            this.tableShow = true;
          }, 2000);
          return console.log('date mmatched')
        }
      }
      this.tableShow = false;
      this.noContent = `No records found on this date ${this.f.date1.value}`
    }
  )
}

showBasedOnDateSelectionById(id){
  this.userService.getFileById(id).subscribe(
    res => {
      console.log(res);
    }
  )
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

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}




