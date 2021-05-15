import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from '../../models/users-model';


@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  headers1 = new HttpHeaders().set('Content-Type', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

  constructor(private http: HttpClient) {
    this.getFileUploads();
   }

  // Create
  createEmployee(data): Observable<Users> {
    let url = `${this.baseUri}/create`;
    return this.http.post<Users>(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all employees
  getEmployees(): Observable<Users> {
    return this.http.get<Users>(`${this.baseUri}/read`);
  }

  // Get employee
  getEmployee(id): Observable<Users> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get<Users>(url, {headers: this.headers})
  }

  // Update employee
  updateEmployee(id, data): Observable<Users> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put<Users>(url, data, { headers: this.headers })
  }

  // Delete employee
  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

///// below onsubmit
  uploadFile(body): Observable<any> {
    return this.http.post<any>(`${this.baseUri}/file-upload/files`, body)
  }

  getFileUploads(){
    debugger;
    return this.http.get(`${this.baseUri}/file-upload/allFiles`)
  }

  updateFile(id, data){
    debugger;
    return this.http.put(`${this.baseUri}/file-upload/update/${id}`, data );
  }

  getFileById(id){
    return this.http.get(`${this.baseUri}/file-upload/${id}`);
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
