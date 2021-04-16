import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Associate, AssociatePaginationRsp } from '../models/associate';


const BASE_URL = 'http://localhost:3000/api'
@Injectable({
  providedIn: 'root'
  
})
export class AssociateService {

  constructor( private http: HttpClient) { }
  page:any;
  perPage:any;
  getAssociates():Observable<AssociatePaginationRsp>{
    let queryString1 = `${BASE_URL}/associates`
    // let queryString = `${BASE_URL}/associates?page=${page + 1}&perPage=${perPage}`;
    // if(sortField && sortDir) {
    //   queryString = `${queryString}&sort=${sortField}&sortDir=${sortDir}`;
    // }
    // if (filter) {
    //   queryString = `${queryString}&filter=${filter}`
    // }
    return this.http.get<AssociatePaginationRsp>(queryString1);
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
