import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url ="http://localhost:5555/employee"
  constructor(
    private http: HttpClient
  ) { }

  getEmployee(){
    return this.http.get(`${this.url}`);
  }

  deleteEmployee(id){
    return this.http.delete(`${this.url}/${id}`);
  }

  postEmployee(body){
    return this.http.post(`${this.url}`, body)
  }

  getEmployeeById(id){
    return this.http.get(`${this.url}/${id}`);
  }

  putEmployee(id, body){
    return this.http.put(`${this.url}/${id}`, body);
  }


}
