import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { SearchfilterPipe } from "./../../../pipe/searchfilter.pipe";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
 
})
export class FileUploadComponent implements OnInit {

  data: any=[];
  file: any;
  arrayBuffer:any;
  fileList = [];
  isTableShoe =false;
  searchValue: string;
  constructor() { }

  ngOnInit(): void {
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
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});    
        console.log("arraylist hare: ",arraylist); 
        this.fileList = XLSX.utils.sheet_to_json(worksheet,{raw:true});   
        this.isTableShoe = true;
            // this.fileList = [];    
            // console.log(this.fileList)    
    
  }    
} 

}
