import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Associate } from '../models/associate';


const BASE_URL = 'http://localhost:3000/api'
@Injectable({
  providedIn: 'root'
  
})
export class AssociateService {

  constructor( private http: HttpClient) { }

  getAssociates():Observable<Associate>{
   
    return this.http.get<Associate>(`${BASE_URL}/associates`);
  }

  createAssociate(body:Associate):Observable<Associate> {
    //authorization header
    return this.http.post<Associate>(`${BASE_URL}/associates`, body)
  }

  deleteAssociate(id:string):Observable<Associate>{
    //authorization header
    return this.http.delete<Associate>(`${BASE_URL}/associates/${id}`)
  }

  getAssociateById(id:string):Observable<Associate>{
    //authorization header
    return this.http.get<Associate>(`${BASE_URL}/associates/${id}`)
  }

  getUpdateAssociate(id:string, body:Associate){
    // debugger;
    // console.log(body);
    //authorization header
    return this.http.put<Associate>(`${BASE_URL}/associates/${id}`, body)

  }
}
