import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HrModel } from './hr-model';

@Injectable({
  providedIn: 'root'
})
export class HrServiceService {

  // usercontacts: HrModel[] = [
  // {
  //   id: 0,
  //   name: 'Alex',
  //   empId: 1234567,
  //   email: 'alex.blabla@aol.at',
  //   location: 'Pune',
  //   role: 'ASE',
  //   password: '12345',
  //   status: true
  // },
  // {
  //   id: 1,
  //   name: 'John',
  //   empId: 1234568,
  //   email: 'john@gmail.com',
  //   location: 'Banglore',
  //   role: 'Developer',
  //   password: '12345',
  //   status: true
  // },
  // {
  //   id: 2,
  //   name: 'Riki',
  //   empId: 1234569,
  //   email: 'riki@gmail.com',
  //   location: 'Chennai',
  //   role: 'Associate',
  //   password: '12345',
  //   status: true
  // },
  // {
  //   id: 3,
  //   name: 'Vrushabh Dhatrak',
  //   empId: 1234570,
  //   email: 'vrushabh@gmail.com',
  //   location: 'Pune',
  //   role: 'Associate',
  //   password: '12345',
  //   status: true
  // },
  // {
  //   id: 4,
  //   name: 'Jayesh',
  //   empId: 1234571,
  //   email: 'jayesh@gmail.com',
  //   location: 'Mumbai',
  //   role: 'Hr',
  //   password: '12345',
  //   status: false
  // },
  // {
  //   id: 5,
  //   name: 'Akash',
  //   empId: 1234572,
  //   email: 'aksh@gmail.com',
  //   location: 'Trevendrum',
  //   role: 'Developer',
  //   password: '12345',
  //   status: false
  // },
  // ];

  // create(usercontact: HrModel) {
  //   const itemIndex = this.usercontacts.length;
  //   usercontact.id = this.getnextId();
  //   console.log(usercontact);
  //   this.usercontacts[itemIndex] = usercontact;
  // }

  // delete(usercontact: HrModel) {
  //   this.usercontacts.splice(this.usercontacts.indexOf(usercontact), 1);
  // }

  // update(usercontact: HrModel) {
  //   const itemIndex = this.usercontacts.findIndex(item => item.id === usercontact.id);
  //   console.log(itemIndex);
  //   this.usercontacts[itemIndex] = usercontact;
  // }

  // getall(): HrModel[] {
  //   console.log('usercontactservice:getall');
  //   console.log(this.usercontacts);
  //   return this.usercontacts;
  // }

  // reorderUserContacts(usercontact: HrModel) {
  //   console.log('Zur Info:', usercontact);
  //   this.usercontacts = this.usercontacts
  //     .map(uc => uc.id === usercontact.id ? usercontact : uc)
  //     .sort((a, uc) => uc.id - uc.id);
  // }

  // getUserById(id: number) {
  //   console.log(id);
  //   const itemIndex = this.usercontacts.findIndex(item => item.id === id);
  //   console.log(itemIndex);
  //   return this.usercontacts[itemIndex];
  // }

  // getnextId(): number {
  //   let highest = 0;
  //   this.usercontacts.forEach(function (item) {
  //     if (highest === 0) {
  //       highest = item.id;
  //     }
  //     if (highest < item.id) {
  //       highest = item.id;
  //     }
  //   });
  //   return highest + 1;
  // }

  ///// constructor
  baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  headers1 = new HttpHeaders().set('Content-Type', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

  constructor(private http: HttpClient) {
    this.getFileUploads();
   }

  // Create
  createEmployee(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all employees
  getEmployees() {
    return this.http.get(`${this.baseUri}/read`);
  }

  // Get employee
  getEmployee(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateEmployee(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // /// file upload
  // uploadExcellFile(fd:FormData){
  //   const fd = new FormData();
  //   fd.append('file',fd);
  //   let url = `http://localhost:4000/file`;
  //   return this.http.post<any>(url, fd).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }
///// below onsubmit
  uploadFile(body): Observable<any> {
    // var headers = new HttpHeaders().set('Content-Type', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		// var fd = new FormData();
    // fd.append('name', date);
		// fd.append('file', file);
    // debugger;
		return this.http.post<any>(`http://localhost:4000/api/file-upload/files`, body, {headers:this.headers})
}

  getFileUploads(){
    return this.http.get('http://localhost:4000/api/file-upload/allFiles')
  }

  updateFile(id, data){
    return this.http.put(`http://localhost:4000/api/file-upload/update/${id}`, data)
  }




  //////below on image input
  // profileInfo(files): Observable<any> {
	// 	var fd = new FormData();
	// 	fd.append("file", files);
	// 	return this.http.post(`http://localhost:4000/file-upload/imageInputFile`, fd)
	// }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
